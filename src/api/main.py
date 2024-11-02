from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from typing import List

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WaveformParams(BaseModel):
    frequency: float
    velocity: float
    distance: float
    is_moving: bool
    has_reflection: bool
    time_points: int = 1000

@app.post("/api/calculate-waveform")
async def calculate_waveform(params: WaveformParams):
    try:
        # Time array
        t = np.linspace(0, 1, params.time_points)

        # Constants
        c = 3e8  # Speed of light in m/s

        # Calculate propagation delay
        delay = params.distance / c

        # Calculate Doppler factor
        doppler_factor = 1 + (params.velocity / c) if params.is_moving else 1

        # Direct wave
        phase = 2 * np.pi * params.frequency * (t - delay) * doppler_factor
        direct_wave = np.sin(phase)

        # Reflected wave (if applicable)
        reflected_wave = None
        if params.has_reflection:
            reflection_delay = (2 * params.distance) / c
            reflected_phase = 2 * np.pi * params.frequency * (t - reflection_delay) * doppler_factor
            reflected_wave = 0.7 * np.sin(reflected_phase + np.pi)  # 0.7 = reflection coefficient

        # Combine waves if there's reflection
        if params.has_reflection:
            combined_wave = direct_wave + reflected_wave
        else:
            combined_wave = direct_wave

        return {
            "time": t.tolist(),
            "direct_wave": direct_wave.tolist(),
            "reflected_wave": reflected_wave.tolist() if reflected_wave is not None else None,
            "combined_wave": combined_wave.tolist()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}