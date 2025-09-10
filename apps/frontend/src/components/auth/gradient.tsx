"use client";

import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { cn } from '@/lib/utils';

export default function SmoothGradient({ containerClassName }: { containerClassName?: string }) {
    return (
        <div className={cn("relative h-[600px] w-full", containerClassName)}>
            <ShaderGradientCanvas className="h-full w-full">
                <ShaderGradient
                    control='query'
                    urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.5&cAzimuthAngle=60&cDistance=7.1&cPolarAngle=90&cameraZoom=9.8&color1=%23ff7a33&color2=%2333a0ff&color3=%23ffc53d&destination=onCanvas&embedMode=off&envPreset=dawn&format=gif&fov=40&frameRate=10&grain=off&http%3A%2F%2Flocalhost%3A3002%2Fcustomize%3Fanimate=on&lightType=3d&pixelDensity=1&positionX=0&positionY=-0.15&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&type=sphere&uAmplitude=1.4&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=0.4&uTime=0&wireframe=false'
                />
            </ShaderGradientCanvas>

            {/* Vignette effect using inset box shadow */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_30px_20px_rgba(0,0,0,0.4)]" />

            {/* Text Overlay with Background */}
            <div className="absolute bottom-3 left-3 pointer-events-none select-none z-10">
                <div className="bg-black/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
                    <h1 className="text-3xl font-bold mb-2 tracking-tight text-white">
                        Trafyx
                    </h1>
                    <p className="text-sm font-light opacity-90 tracking-wide text-white/80">
                        Your API Testing Utility
                    </p>
                </div>
            </div>
        </div>
    );
}