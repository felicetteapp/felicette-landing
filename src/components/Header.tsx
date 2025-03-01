import React, { useEffect, useRef } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { getRandomItem } from "../helpers";
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
const tdmodel = "/Fl4.glb";

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

  useEffect(() => {
    const felicetteElText = felicetteEl.current?.innerText ?? "";
    const felicetteParts = [EMOJI_PLACEHOLDER, ...felicetteElText.split("")];
    const appElText = appEl.current?.innerText ?? "";
    const appParts = appElText.split("");
    const totalParts = [...felicetteParts, ...appParts];
    const pos = felicetteParts.length;

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

  const mousePosition = useRef({ x: 0, y: 0 });
  const mousePositionRt = useRef({ x: 0, y: 0 });
  const mouseEventTimeout = useRef<NodeJS.Timeout>();
  const movingRocketTimeout = useRef<NodeJS.Timeout>();
  useEffect(() => {
    mousePosition.current = {
      x: document.documentElement.clientWidth / 2,
      y:
        document.documentElement.clientHeight / 2 +
        document.documentElement.scrollTop,
    };
    document.documentElement.style.setProperty("--mouse-angle", `0deg`);
    document.documentElement.style.setProperty(
      "--mouse-x",
      document.documentElement.clientWidth / 2 + "px"
    );
    document.documentElement.style.setProperty(
      "--rt-mouse-x",
      document.documentElement.clientWidth / 2 + "px"
    );
    document.documentElement.style.setProperty(
      "--mouse-y",
      document.documentElement.clientHeight / 2 +
        document.documentElement.scrollTop +
        "px"
    );
    document.documentElement.style.setProperty(
      "--rt-mouse-y",
      document.documentElement.clientHeight / 2 +
        document.documentElement.scrollTop +
        "px"
    );
    const listener = (event: MouseEvent) => {
      mousePositionRt.current = {
        x: event.clientX,
        y: event.clientY + document.documentElement.scrollTop,
      };
      document.documentElement.style.setProperty(
        "--rt-mouse-x",
        `${event.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--rt-mouse-y",
        `${event.clientY + document.documentElement.scrollTop}px`
      );

      if (mouseEventTimeout.current) {
        clearTimeout(mouseEventTimeout.current);
      }

      mouseEventTimeout.current = setTimeout(() => {
        const prevMousePosition = mousePosition.current;
        const newMousePosition = {
          x: event.clientX,
          y: event.clientY + document.documentElement.scrollTop,
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
    };
  }, []);

  const threeJsContainer = useRef<HTMLDivElement>(null);
  const logoImg = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!threeJsContainer.current) {
      return;
    }

    if (!WebGL.isWebGL2Available()) {
      logoImg.current?.style.setProperty("opacity", "1");
      threeJsContainer.current.style.setProperty("display", "none");
      return;
    }

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
          antialias: false,
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

        obj.position.x -= center.x;
        obj.position.y -= center.y;
        obj.position.z -= center.z;

        defaultCamera.near = size / 100;
        defaultCamera.far = size * 100;
        defaultCamera.updateProjectionMatrix();

        defaultCamera.position.copy(center);
        defaultCamera.position.y = -0.4;
        defaultCamera.position.z = 2.3;
        defaultCamera.lookAt(center);

        const lightsTarget = new THREE.Object3D();
        lightsTarget.position.copy(center);
        scene.add(lightsTarget);

        const light = new THREE.DirectionalLight(0xffffff, 5);
        light.position.set(-1, 2, 3);
        scene.add(light);

        const secondLight = new THREE.DirectionalLight(0x92cdcf, 20);

        obj.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        secondLight.position.set(2, 0, -3);
        scene.add(secondLight);

        light.target = lightsTarget;
        secondLight.target = lightsTarget;

        const textureLoader = new THREE.TextureLoader();

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
        let lastTime = performance.now();

        const calculateRotationDirection = () => {
          const containerPos =
            threeJsContainer.current?.getBoundingClientRect() || {
              left: 0,
              width: 0,
            };
          const centerOfTheContainer =
            containerPos.left + containerPos.width / 2;
          const x = mousePositionRt.current.x - centerOfTheContainer;
          rotationDirection = x / (window.innerWidth / 2);
        };

        const animateHorizontalRotation = (currentTime: number) => {
          const deltaTime = currentTime - lastTime;
          lastTime = currentTime;
          obj.rotation.y += 0.00125 * rotationDirection * deltaTime;
          composer.render();

          calculateRotationDirection();

          requestAnimationFrame(animateHorizontalRotation);
        };

        requestAnimationFrame(animateHorizontalRotation);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
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
        />
        <div
          ref={threeJsContainer}
          style={{
            display: "none",
          }}
          className="header__three-js-container"
        />
        <div className="header__main-title__wrapper">
          <h2 className="header__main-title">{t.projects}</h2>
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
        <section className="header__bottom-separator" />
      </header>
    </>
  );
};
