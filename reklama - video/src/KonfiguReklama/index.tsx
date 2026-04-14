import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { SCENES, TRANSITION_FRAMES } from "../config";
import { SceneComponent } from "./Scene";

type Props = {
  sceneDurations: number[];
};

export const KonfiguReklama: React.FC<Props> = ({ sceneDurations }) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {SCENES.map((scene, index) => {
          const durationInFrames =
            sceneDurations[index] ?? 4 * fps;

          const isEven = index % 2 === 0;

          return (
            <React.Fragment key={scene.id}>
              {index > 0 && (
                <TransitionSeries.Transition
                  presentation={
                    scene.type === "reveal"
                      ? fade()
                      : slide({ direction: isEven ? "from-bottom" : "from-left" })
                  }
                  timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
                />
              )}
              <TransitionSeries.Sequence durationInFrames={durationInFrames}>
                <Sequence from={0}>
                  <Audio
                    src={staticFile(`voiceover/${scene.id}.mp3`)}
                    volume={1}
                  />
                </Sequence>
                <SceneComponent
                  scene={scene}
                  sceneIndex={index}
                />
              </TransitionSeries.Sequence>
            </React.Fragment>
          );
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
