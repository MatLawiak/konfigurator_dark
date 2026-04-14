import * as fs from "fs";
import * as path from "path";
import * as https from "https";

// Parse .env manually — no dotenv dependency
function readEnv(envPath: string): Record<string, string> {
  const result: Record<string, string> = {};
  try {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      result[key] = value;
    }
  } catch {
    // .env not found
  }
  return result;
}

const env = readEnv(path.join(__dirname, ".env"));
const ELEVENLABS_API_KEY = env["ELEVENLABS_API_KEY"] || process.env["ELEVENLABS_API_KEY"] || "";

const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel (female)

interface Scene {
  id: string;
  voiceText: string;
}

const SCENES: Scene[] = [
  {
    id: "hook",
    voiceText:
      "Szukasz strony dla swojej inwestycji? Potrzebujesz domeny? Identyfikacji wizualnej? Kampanii reklamowych?",
  },
  {
    id: "pain",
    voiceText:
      "Dziesiątki dostawców. Dziesiątki umów. Zero kontroli. Znasz to, prawda? Tyle do ogarnięcia — a mieszkania wciąż czekają na kupujących.",
  },
  {
    id: "reveal",
    voiceText:
      "A gdyby wszystko — strona, domena, materiały i kampanie — było w jednym narzędziu? Poznaj Konfigurator Twisted Pixel.",
  },
  {
    id: "strona",
    voiceText:
      "Strona internetowa zgodna z ustawą deweloperską. Prospekt informacyjny, wyszukiwarka lokali, dane z rejestrów rządowych — wszystko automatycznie.",
  },
  {
    id: "domena",
    voiceText:
      "Domena? Wpisz nazwę inwestycji, sprawdź dostępność i zamów jednym klikiem. Proste.",
  },
  {
    id: "materialy",
    voiceText:
      "Branding, wizualizacje trójwymiarowe, broszury, katalog inwestycji. Kompletna identyfikacja wizualna — od nazwy po materiały drukowane.",
  },
  {
    id: "kampanie",
    voiceText:
      "Kampanie Google Ads i Meta Ads — trafiasz precyzyjnie do kupujących szukających mieszkań w Twoim rejonie.",
  },
  {
    id: "stats",
    voiceText:
      "Dla inwestycji Malta View pozyskaliśmy ponad tysiąc siedemset leadów przy koszcie od sześćdziesięciu pięciu do stu złotych za kontakt. Kampania działa nieprzerwanie do dziś.",
  },
  {
    id: "pakiet",
    voiceText:
      "Branding, wizualizacje, strona sprzedażowa, social media, analityka i kampanie leadowe. Jeden pakiet — kompletne narzędzie sprzedażowe dla inwestycji deweloperskiej.",
  },
  {
    id: "outro",
    voiceText:
      "Jeden konfigurator. Kompletne rozwiązanie. Skonfiguruj swój projekt z Twisted Pixel — teraz.",
  },
];

const force = process.argv.includes("--force");

async function generateVoiceover(scene: Scene): Promise<void> {
  const outputDir = path.join(__dirname, "public", "voiceover");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${scene.id}.mp3`);

  if (!force && fs.existsSync(outputPath)) {
    console.log(`[SKIP] ${scene.id}.mp3 already exists`);
    return;
  }

  console.log(`[GEN]  Generating ${scene.id}.mp3 ...`);

  const body = JSON.stringify({
    text: scene.voiceText,
    model_id: "eleven_multilingual_v2",
    voice_settings: {
      stability: 0.55,
      similarity_boost: 0.75,
      style: 0.2,
    },
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.elevenlabs.io",
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
        Accept: "audio/mpeg",
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errBody = "";
        res.on("data", (chunk: Buffer) => {
          errBody += chunk.toString();
        });
        res.on("end", () => {
          reject(
            new Error(
              `ElevenLabs API error ${res.statusCode}: ${errBody}`
            )
          );
        });
        return;
      }

      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        fs.writeFileSync(outputPath, buffer);
        console.log(`[OK]   Saved ${scene.id}.mp3 (${buffer.length} bytes)`);
        resolve();
      });
      res.on("error", reject);
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function main(): Promise<void> {
  if (!ELEVENLABS_API_KEY) {
    console.error("ERROR: ELEVENLABS_API_KEY not found in .env or environment");
    process.exit(1);
  }

  console.log(`Generating voiceovers for ${SCENES.length} scenes...`);
  console.log(`Force regenerate: ${force}`);
  console.log("");

  for (const scene of SCENES) {
    try {
      await generateVoiceover(scene);
    } catch (err) {
      console.error(`[ERR]  Failed for ${scene.id}:`, err);
    }
  }

  console.log("\nDone.");
}

main();
