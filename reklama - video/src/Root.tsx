import React from "react";
import { Composition, staticFile } from "remotion";
import { KonfiguReklama } from "./KonfiguReklama/index";
import { SCENES, TRANSITION_FRAMES } from "./config";
import { getAudioDuration } from "./get-audio-duration";

const FPS = 30;
const DEFAULT_SCENE_FRAMES = 4 * FPS;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="KonfiguReklama"
        component={KonfiguReklama}
        durationInFrames={900}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{
          sceneDurations: SCENES.map(() => DEFAULT_SCENE_FRAMES),
        }}
        calculateMetadata={async ({ props }) => {
          const fps = FPS;
          const sceneDurations: number[] = [];

          for (const scene of SCENES) {
            try {
              const duration = await getAudioDuration(
                staticFile(`voiceover/${scene.id}.mp3`)
              );
              // Audio duration + small padding
              const frames = Math.ceil(duration * fps) + Math.ceil(fps * 0.15);
              sceneDurations.push(frames);
            } catch {
              sceneDurations.push(DEFAULT_SCENE_FRAMES);
            }
          }

          const totalTransitionFrames =
            (SCENES.length - 1) * TRANSITION_FRAMES;
          const totalSceneFrames = sceneDurations.reduce((a, b) => a + b, 0);
          const durationInFrames = totalSceneFrames - totalTransitionFrames;

          return {
            durationInFrames,
            props: {
              ...props,
              sceneDurations,
            },
          };
        }}
      />
    </>
  );
};
