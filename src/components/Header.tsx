import React, { useEffect, useRef } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { easeInOutBack, easeTo, getRandomItem } from "../helpers";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import felicetteLogo from "../images/felicette_logo.png";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";

import * as THREE from "three";
import { useIntl } from "gatsby-plugin-intl";
const tdmodel = "/felicette_helmet2.glb";

const loader = new GLTFLoader();

const EMOJI_PLACEHOLDER = "🌍";

const defaultHeaderTranslation = {
  apps: "Apps:",
  projects: "Projects:",
};
export const Header = ({
  data,
}: {
  data?: Partial<typeof defaultHeaderTranslation>;
}) => {
  const t = { ...defaultHeaderTranslation, ...data };
  const felicetteEl = useRef<HTMLHeadingElement>(null);
  const appEl = useRef<HTMLHeadingElement>(null);
  const nextFrameTimer = useRef<NodeJS.Timeout>();
  const { formatMessage } = useIntl();
  const mousePosition = useRef({ x: 0, y: 0 });
  const mousePositionRt = useRef({ x: 0, y: 0 });
  const mouseEventTimeout = useRef<NodeJS.Timeout>();
  const movingRocketTimeout = useRef<NodeJS.Timeout>();
  const threeJsContainer = useRef<HTMLDivElement>(null);
  const logoImg = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const felicetteElText = felicetteEl.current?.innerText ?? "";
    const felicetteParts = [EMOJI_PLACEHOLDER, ...felicetteElText.split("")];
    const appElText = appEl.current?.innerText ?? "";
    const appParts = appElText.split("");
    const totalParts = [...felicetteParts, ...appParts];
    const pos = felicetteParts.length;

    const storedState = window.localStorage.getItem("felicette-header-state");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      if (parsedState.totalParts) {
        totalParts.length = 0;
        parsedState.totalParts.forEach((part: string) => {
          totalParts.push(part);
        });
      }
    }

    const emojis = ["🚀", "🧑‍🚀", "👽", "🛸", "⭐", "🌞", "🌍", "🐱"];

    const animateFrame = () => {
      if (nextFrameTimer.current) {
        clearTimeout(nextFrameTimer.current);
      }

      if (!felicetteEl.current) {
        return;
      }

      if (!appEl.current) {
        return;
      }

      const firstLetter = totalParts.shift();
      totalParts.push(firstLetter ?? "");

      const initialPart = [...totalParts].splice(0, pos);
      const finalPart = [...totalParts].splice(pos, totalParts.length - pos);
      felicetteEl.current.innerHTML = initialPart
        .join("")
        .replace(
          EMOJI_PLACEHOLDER,
          `<span class="header__felicette-title__emoji"">${getRandomItem(
            emojis
          )}</span>`
        );
      appEl.current.innerHTML = finalPart
        .join("")
        .replace(
          EMOJI_PLACEHOLDER,
          `<span class="header__felicette-title__emoji"">${getRandomItem(
            emojis
          )}</span>`
        );

      const state = {
        totalParts,
      };

      window.localStorage.setItem(
        "felicette-header-state",
        JSON.stringify(state)
      );
      nextFrameTimer.current = setTimeout(() => {
        animateFrame();
      }, 500);
    };

    animateFrame();

    return () => {
      if (nextFrameTimer.current) {
        clearTimeout(nextFrameTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    mousePosition.current = {
      x: document.documentElement.clientWidth / 2,
      y:
        document.documentElement.clientHeight / 2 +
        document.documentElement.scrollTop,
    };

    const storedMousePosition = window.localStorage.getItem(
      "felicette-mouse-position"
    );
    const storedMousePositionRt = window.localStorage.getItem(
      "felicette-rt-mouse-position"
    );
    if (storedMousePosition) {
      const parsedMousePosition = JSON.parse(storedMousePosition);
      mousePosition.current = parsedMousePosition;
    }

    if (storedMousePositionRt) {
      const parsedMousePositionRt = JSON.parse(storedMousePositionRt);
      mousePositionRt.current = parsedMousePositionRt;
    }

    document.documentElement.style.setProperty("--mouse-angle", `0deg`);
    document.documentElement.style.setProperty(
      "--mouse-x",
      mousePosition.current.x + "px"
    );
    document.documentElement.style.setProperty(
      "--rt-mouse-x",
      mousePositionRt.current.x + "px"
    );
    document.documentElement.style.setProperty(
      "--mouse-y",
      mousePosition.current.y + "px"
    );

    document.documentElement.style.setProperty(
      "--rt-mouse-y",
      mousePositionRt.current.y + "px"
    );

    const listener = (event: MouseEvent) => {
      mousePositionRt.current = {
        x: event.clientX,
        y: event.clientY,
      };
      document.documentElement.style.setProperty(
        "--rt-mouse-x",
        `${event.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--rt-mouse-y",
        `${event.clientY}px`
      );

      if (mouseEventTimeout.current) {
        clearTimeout(mouseEventTimeout.current);
      }

      mouseEventTimeout.current = setTimeout(() => {
        const prevMousePosition = mousePosition.current;
        const newMousePosition = {
          x: event.clientX,
          y: event.clientY,
        };
        const deltaX = newMousePosition.x - prevMousePosition.x;
        const deltaY = newMousePosition.y - prevMousePosition.y;
        const angleRadians = Math.atan2(deltaY, deltaX);
        const angleDegrees = (angleRadians * 180) / Math.PI;

        mousePosition.current = {
          x: newMousePosition.x,
          y: newMousePosition.y,
        };

        document.documentElement.style.setProperty(
          "--mouse-angle",
          `${angleDegrees}deg`
        );
        document.documentElement.style.setProperty(
          "--mouse-x",
          `${newMousePosition.x}px`
        );
        document.documentElement.style.setProperty(
          "--mouse-y",
          `${newMousePosition.y}px`
        );

        if (movingRocketTimeout.current) {
          clearTimeout(movingRocketTimeout.current);
        }

        document.documentElement.classList.add("--rocket-moving");

        movingRocketTimeout.current = setTimeout(() => {
          document.documentElement.classList.remove("--rocket-moving");
        }, 1000);
      }, 200);
    };

    document.addEventListener("mousemove", listener);

    return () => {
      document.removeEventListener("mousemove", listener);

      window.localStorage.setItem(
        "felicette-rt-mouse-position",
        JSON.stringify(mousePositionRt.current)
      );

      window.localStorage.setItem(
        "felicette-mouse-position",
        JSON.stringify(mousePosition.current)
      );
    };
  }, []);

  useEffect(() => {
    if (!threeJsContainer.current) {
      return;
    }

    if (!WebGL.isWebGL2Available()) {
      logoImg.current?.style.setProperty("opacity", "1");
      threeJsContainer.current.style.setProperty("display", "none");
      return;
    }

    const cleanupFunctions: (() => void)[] = [];

    loader.load(
      tdmodel,
      function (gltf) {
        logoImg.current?.style.setProperty("display", "none");
        threeJsContainer.current?.style.setProperty("display", "block");

        const scene = new THREE.Scene();
        const containerSize = threeJsContainer.current?.getBoundingClientRect();
        const aspectRatio =
          (containerSize?.width ?? 1) / (containerSize?.height ?? 1);

        const defaultCamera = new THREE.PerspectiveCamera(
          50,
          aspectRatio,
          0.1,
          1000
        );

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        renderer.setSize(
          containerSize?.width ?? 10,
          containerSize?.height ?? 10
        );

        renderer.setPixelRatio(window.devicePixelRatio);

        threeJsContainer.current?.appendChild(renderer.domElement);

        defaultCamera.position.z = 5;

        scene.add(defaultCamera);

        const { scene: obj } = gltf;

        obj.updateMatrix();
        obj.updateWorldMatrix(true, true);
        scene.add(obj);

        const box = new THREE.Box3().setFromObject(obj);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        obj.position.y -= center.y;
        obj.position.z -= center.z;
        obj.rotation.y = -90 * (Math.PI / 180);

        const initialRotation = {
          y: obj.rotation.y,
        };

        const storedRotation = window.localStorage.getItem(
          "felicette-3d-model-rotation"
        );
        if (storedRotation) {
          const parsedRotation = JSON.parse(storedRotation);
          obj.rotation.x = parsedRotation.x;
          obj.rotation.y = parsedRotation.y;
          obj.rotation.z = parsedRotation.z;
        }

        defaultCamera.near = size / 100;
        defaultCamera.far = size * 100;
        defaultCamera.updateProjectionMatrix();

        defaultCamera.position.copy(center);
        defaultCamera.position.y = 0.5;
        defaultCamera.position.z = 4.7;
        defaultCamera.lookAt(center);

        const lightsTarget = new THREE.Object3D();
        lightsTarget.position.copy(center);
        scene.add(lightsTarget);

        const light = new THREE.DirectionalLight(0xffffff, 5);
        light.position.set(-1, 0, 0.5);
        scene.add(light);

        const secondLight = new THREE.DirectionalLight(0x92cdcf, 10);

        obj.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        secondLight.position.set(2, 0, -1);
        scene.add(secondLight);

        light.target = lightsTarget;
        secondLight.target = lightsTarget;

        let composer = new EffectComposer(renderer);

        const renderPass = new RenderPass(scene, defaultCamera);
        composer.addPass(renderPass);

        let outlinePass = new OutlinePass(
          new THREE.Vector2(window.innerWidth * 20, window.innerHeight * 20),
          scene,
          defaultCamera
        );

        outlinePass.visibleEdgeColor.set("#1c1d21");
        outlinePass.selectedObjects = obj.children;

        outlinePass.edgeStrength = 10;
        outlinePass.edgeThickness = 1.0;

        const outputPass = new OutputPass();
        composer.addPass(outputPass);

        const effectFXAA = new ShaderPass(FXAAShader);
        effectFXAA.uniforms["resolution"].value.set(
          1 / (containerSize?.width || 1),
          1 / (containerSize?.height || 1)
        );
        composer.addPass(effectFXAA);
        composer.addPass(outlinePass);

        composer.render();

        let rotationDirection = 1;

        const storedRotationDirection = window.localStorage.getItem(
          "felicette-3d-rotation-direction"
        );
        if (storedRotationDirection) {
          const parsedRotationDirection = JSON.parse(storedRotationDirection);
          rotationDirection = parsedRotationDirection;
        }

        let lastTime = performance.now();
        let canvasHovering = 0;
        let canvasHoveringRotationY = 0;
        let distanceToTargetRotation = 0;
        let frame = 0;

        const calculateRotationDirection = () => {
          const containerPos =
            threeJsContainer.current?.getBoundingClientRect() || {
              left: 0,
              width: 0,
              height: 0,
            };
          const centerOfTheContainer =
            containerPos.left + containerPos.width / 2;
          const x = mousePositionRt.current.x - centerOfTheContainer;
          rotationDirection = x / (window.innerWidth / 2);

          const isCanvasHovering =
            x > -containerPos.width / 2 &&
            x < containerPos.width / 2 &&
            mousePositionRt.current.y > 0 &&
            mousePositionRt.current.y < containerPos.height;

          if (isCanvasHovering && !canvasHovering) {
            canvasHovering = Date.now();
            canvasHoveringRotationY = obj.rotation.y;
            distanceToTargetRotation =
              initialRotation.y - canvasHoveringRotationY;
          } else if (!isCanvasHovering) {
            canvasHovering = 0;
          }
        };

        const animateHorizontalRotation = (currentTime: number) => {
          const deltaTime = currentTime - lastTime;
          lastTime = currentTime;

          if (canvasHovering) {
            const rotationDuration = Math.max(
              500,
              Math.abs(distanceToTargetRotation) * 500
            );
            const rotationProgress = easeTo({
              start: canvasHoveringRotationY,
              end: initialRotation.y,
              duration: rotationDuration,
              startTime: canvasHovering,
              easingFunction: easeInOutBack,
            });

            secondLight.color = new THREE.Color(0xcfa7c2);

            obj.rotation.y = rotationProgress;
          } else {
            secondLight.color = new THREE.Color(0x92cdcf);
            obj.rotation.y += 0.00125 * rotationDirection * deltaTime;
            if (obj.rotation.y > Math.PI) {
              obj.rotation.y -= Math.PI * 2;
            } else if (obj.rotation.y < -Math.PI) {
              obj.rotation.y += Math.PI * 2;
            }
          }
          composer.render();

          calculateRotationDirection();

          frame = requestAnimationFrame(animateHorizontalRotation);
        };

        frame = requestAnimationFrame(animateHorizontalRotation);

        cleanupFunctions.push(() => {
          window.localStorage.setItem(
            "felicette-3d-model-rotation",
            JSON.stringify({
              x: obj.rotation.x,
              y: obj.rotation.y,
              z: obj.rotation.z,
            })
          );

          window.localStorage.setItem(
            "felicette-3d-rotation-direction",
            JSON.stringify(rotationDirection)
          );
        });

        cleanupFunctions.push(() => {
          if (frame) {
            cancelAnimationFrame(frame);
          }
        });

        cleanupFunctions.push(() => {
          if (renderer) {
            renderer.dispose();
          }
          if (composer) {
            composer.dispose();
          }
          if (outlinePass) {
            outlinePass.dispose();
          }
          if (effectFXAA) {
            effectFXAA.dispose();
          }
          if (outputPass) {
            outputPass.dispose();
          }
          if (light) {
            light.dispose();
          }
          if (secondLight) {
            secondLight.dispose();
          }
        });

        //handle window resize

        const handleResize = () => {
          const containerSize =
            threeJsContainer.current?.getBoundingClientRect();

          if (!containerSize) {
            return;
          }

          renderer.setSize(
            containerSize?.width ?? 10,
            containerSize?.height ?? 10
          );
          defaultCamera.aspect = containerSize?.width / containerSize?.height;
          defaultCamera.updateProjectionMatrix();
          composer.setSize(
            containerSize?.width ?? 10,
            containerSize?.height ?? 10
          );
          effectFXAA.uniforms["resolution"].value.set(
            1 / (containerSize?.width || 1),
            1 / (containerSize?.height || 1)
          );
        };

        window.addEventListener("resize", handleResize);

        cleanupFunctions.push(() => {
          window.removeEventListener("resize", handleResize);
        });
      },
      undefined,
      function () {}
    );

    return () => {
      cleanupFunctions.forEach((cleanup) => {
        cleanup();
      });
    };
  }, []);
  return (
    <>
      <header className="header">
        <img
          className="header__logo"
          src={felicetteLogo}
          alt="Felicette logo"
          ref={logoImg}
          style={{
            opacity: 0,
          }}
          onClick={() => {
            window.location.reload();
          }}
        />
        <div
          ref={threeJsContainer}
          style={{
            display: "none",
          }}
          onClick={() => {
            window.location.reload();
          }}
          className="header__three-js-container"
        />
        <div className="header__main-title__wrapper">
          <h2 className="header__main-title"></h2>
        </div>
        <h1 className="header__felicette-title__start" ref={felicetteEl}>
          felicette
        </h1>
        <h1 className="header__felicette-title__end" ref={appEl}>
          .app
        </h1>
        <section className="header__language__title">
          language / lingua / idioma / langue
        </section>
        <LanguageSelector />
        <section className="header__bottom-separator"></section>
      </header>
      <h2 className="header__bottom-separator__title">
        {formatMessage({ id: "header.projects" })}
      </h2>
    </>
  );
};
