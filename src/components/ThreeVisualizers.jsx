import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeDataPrism
 * Floating 3D Octahedron Wireframe & Glowing Core for Customer Job Request
 */
export const ThreeDataPrism = ({ className = "w-full h-full" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Outer Octahedron
    const geometry = new THREE.OctahedronGeometry(2, 0);
    const material = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      emissive: 0x1e40af,
      emissiveIntensity: 0.6
    });
    const prism = new THREE.Mesh(geometry, material);
    scene.add(prism);

    // Inner glowing core
    const innerGeom = new THREE.OctahedronGeometry(1.6, 0);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.25,
      wireframe: false
    });
    const innerPrism = new THREE.Mesh(innerGeom, innerMat);
    prism.add(innerPrism);

    const light = new THREE.PointLight(0xffffff, 1.2, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x334155, 1);
    scene.add(ambientLight);

    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);
      prism.rotation.y += 0.006;
      prism.rotation.x += 0.004;
      prism.position.y = Math.sin(Date.now() * 0.0015) * 0.18;
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 300;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
};

/**
 * ThreeRoomOrchestrator
 * Cinematic 18-Room Spatial Topology Hub from Stitch Refinement
 * Features:
 * - Orbital wheel zoom & spring easing
 * - Central pulsating icosahedron wireframe core
 * - High-metalness glass room portals with sharp edge frames
 * - Raycaster click detection with procedural transition sound
 */
export const ThreeRoomOrchestrator = ({ className = "w-full h-full", onSelectRoom }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Perspective Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.set(0, 8, 26);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // High-Contrast Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x0e0e0f, 0.8);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0x3b82f6, 12);
    spotLight.position.set(20, 35, 20);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.6;
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Central Neural Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const coreGeom = new THREE.IcosahedronGeometry(2.4, 2);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.5,
      shininess: 100,
      wireframe: true
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreGroup.add(coreMesh);

    // 18 Spatial Portals
    const portals = [];
    const rooms = [
      { id: 1, name: "Electrical Grid", color: 0xf59e0b, code: 'RM-01' },
      { id: 2, name: "Plumbing & Hydro", color: 0x3b82f6, code: 'RM-02' },
      { id: 3, name: "Carpentry & Struct", color: 0x92400e, code: 'RM-03' },
      { id: 4, name: "Appliance Core", color: 0x6366f1, code: 'RM-04' },
      { id: 5, name: "Construction Base", color: 0x71717a, code: 'RM-05' },
      { id: 6, name: "Surface Coating", color: 0xec4899, code: 'RM-06' },
      { id: 7, name: "Ecological Garden", color: 0x10b981, code: 'RM-07' },
      { id: 8, name: "Sanitation Nodes", color: 0x06b6d4, code: 'RM-08' },
      { id: 9, name: "Biosecurity & Pest", color: 0x4d7c0f, code: 'RM-09' },
      { id: 10, name: "Care & Human Svc", color: 0xf43f5e, code: 'RM-10' },
      { id: 11, name: "Autonomous Vehicle", color: 0x334155, code: 'RM-11' },
      { id: 12, name: "Logistics Fleet", color: 0x8b5cf6, code: 'RM-12' },
      { id: 13, name: "Household Automation", color: 0xd946ef, code: 'RM-13' },
      { id: 14, name: "Rural Agri-Tech", color: 0x15803d, code: 'RM-14' },
      { id: 15, name: "Renewable Storage", color: 0x84cc16, code: 'RM-15' },
      { id: 16, name: "Digital Infrastructure", color: 0x0ea5e9, code: 'RM-16' },
      { id: 17, name: "Cyber & Physical Sec", color: 0xef4444, code: 'RM-17' },
      { id: 18, name: "General Dispatch", color: 0x64748b, code: 'RM-18' }
    ];

    const radius = 17;
    rooms.forEach((room, i) => {
      const angle = (i / rooms.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const group = new THREE.Group();
      group.position.set(x, 0, z);
      group.lookAt(0, 0, 0);

      // Glass slab geometry
      const geometry = new THREE.BoxGeometry(3.2, 5.0, 0.4);
      const material = new THREE.MeshStandardMaterial({
        color: room.color,
        transparent: true,
        opacity: 0.35,
        metalness: 0.9,
        roughness: 0.1
      });
      const portal = new THREE.Mesh(geometry, material);
      group.add(portal);

      // Sharp white wireframe edge frame
      const frameGeom = new THREE.EdgesGeometry(geometry);
      const frameMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.45,
        transparent: true
      });
      const frame = new THREE.LineSegments(frameGeom, frameMat);
      group.add(frame);

      portal.userData = { ...room, angle };
      portals.push(portal);
      scene.add(group);
    });

    // Camera Orbital Spring Physics & Wheel Zoom
    let targetRotationY = 0;
    let currentRotationY = 0;
    let targetCameraZ = 26;
    let currentCameraZ = 26;
    let isTransitioning = false;

    const handleWheel = (e) => {
      if (isTransitioning) return;
      targetRotationY += e.deltaY * 0.001;
      targetCameraZ = 26 + Math.abs(Math.sin(targetRotationY)) * 4.5;
    };
    window.addEventListener('wheel', handleWheel, { passive: true });

    // Interactive Raycaster Click Handler
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e) => {
      // Lazy-import or trigger sound
      import('../services/soundEngine.js').then(({ soundEngine }) => {
        soundEngine.playTransitionSweep();
      });

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(portals, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit && hit.userData) {
          isTransitioning = true;
          // Zoom camera towards target portal
          targetRotationY = hit.userData.angle;
          targetCameraZ = 12;

          if (onSelectRoom) {
            onSelectRoom(hit.userData);
          }

          setTimeout(() => {
            isTransitioning = false;
            targetCameraZ = 26;
          }, 1200);
        }
      }
    };
    window.addEventListener('click', handleClick);

    // Mouse drag rotation support
    let isDragging = false;
    let prevMouseX = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      targetRotationY += deltaX * 0.004;
      prevMouseX = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Render Animation Loop
    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);

      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      currentCameraZ += (targetCameraZ - currentCameraZ) * 0.05;

      camera.position.x = Math.sin(currentRotationY) * currentCameraZ;
      camera.position.z = Math.cos(currentRotationY) * currentCameraZ;
      camera.lookAt(0, 0, 0);

      coreGroup.rotation.y += 0.005;
      coreGroup.rotation.x += 0.002;

      // Pulse Core
      const scale = 1 + Math.sin(Date.now() * 0.0015) * 0.06;
      coreMesh.scale.setScalar(scale);

      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Touch Navigation for Mobile & Low-End Devices
    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoveTime = 0;

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchMoveTime = Date.now();
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        targetRotationY += deltaX * 0.005;
        touchStartX = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = (e) => {
      // Tap detection (quick touch without big drag)
      const duration = Date.now() - touchMoveTime;
      if (duration < 250 && e.changedTouches.length === 1) {
        const touch = e.changedTouches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(portals, false);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          if (hit && hit.userData) {
            targetRotationY = hit.userData.angle;
            targetCameraZ = 14;
            if (onSelectRoom) {
              onSelectRoom(hit.userData);
            }
          }
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSelectRoom]);

  return <div ref={containerRef} className={className} />;
};
