---
title: "Autoscaling Serverless Pipelines: Building an HPA Baseline for RL Research"
excerpt: "My project at Politecnico di Milano building a reproducible Kubernetes testbed for multi-stage FaaS pipeline autoscaling."
date: 2026-07-24
---

For my project at **Politecnico di Milano** (AY 2025–2026), I set out to answer a practical question in cloud-native autoscaling: *How do standard rule-based autoscalers behave when forced to match the decision pace of modern Reinforcement Learning (RL) controllers?*

---

## 🎯 The Motivation: Why Build This Baseline?

Recent research in serverless computing (like the **FIGARO** framework) uses Reinforcement Learning agents to make intelligent scaling decisions every 120 seconds. However, standard Kubernetes **Horizontal Pod Autoscaler (HPA)** evaluates CPU metrics every 15 seconds by default.

If we want to prove that an RL agent outperforms Kubernetes' native autoscaler, comparing a 120-second RL agent against a 15-second HPA isn't a fair fight. To solve this, I designed **`mqtt-faas-hpa-baseline`**—a fully reproducible testbed running a multi-stage FaaS pipeline configured specifically to evaluate HPA at a matching 120-second decision cadence.

---

## 🏗️ What I Built: The VideoSearcher Pipeline

I implemented a realistic 6-stage video analysis workflow (*VideoSearcher*) where video files are processed sequentially:

$$\text{HTTP Request} \longrightarrow \text{Flask Gateway} \longrightarrow \text{MQTT Broker} \longrightarrow \text{ffmpeg0} \rightarrow \text{librosa} \rightarrow \text{ffmpeg1} \rightarrow \text{ffmpeg2} \rightarrow \text{deepspeech} \rightarrow \text{grep}$$

- **Decoupled Architecture:** Instead of direct HTTP calls between functions, workers communicate asynchronously using **MQTT v5 shared subscriptions**. This allows Kubernetes to scale pod replicas up or down cleanly without breaking state.
- **Heavyweight AI/Media Stages:** The two main compute bottlenecks are **FFmpeg video compression** ($\sim 15.7\text{s}$) and **Mozilla DeepSpeech speech-to-text** ($\sim 18.4\text{s}$).
- **Non-Intrusive Instrumentation:** I designed a timing collector that records exact per-stage timestamps from MQTT payloads, measuring latency without slowing down the pipeline.

---

## 📊 Most Surprising Key Takeaways

Running 60-minute experimental benchmarks with sinusoidal traffic (up to 262 concurrent workflow jobs) revealed some compelling insights:

1. **Queueing is the Real Bottleneck ($\sim 80\%$ of total latency):**  
   The actual computation time for a video job was completely stable at **$\sim 36$ seconds** regardless of load. However, under heavy load, **queue overhead exploded to over 130 seconds**. 

2. **CPU-Based Autoscaling Reacts Too Late:**  
   Standard HPA scales pods based on CPU utilization. But by the time CPU usage spikes enough to trigger a scale-up, a large queue of waiting jobs has already formed. This proved quantitatively why queue-depth-aware or predictive RL controllers are needed.

3. **Stabilization Windows vs. Raw Evaluation Intervals:**  
   Comparing a discrete 120s sync period (Option 1) against a 120s stabilization window (Option 2) showed that stabilization windows prevent pod thrashing and replica oscillation while maintaining the required 120s decision window.

---

## 🛠️ Lessons Learned & Reflection

This project was a great hands-on deep dive into distributed systems engineering:
- **Kubernetes Internals:** I had to look past surface-level docs to understand how the `kube-controller-manager` and `metrics-server` interaction sets a 60-second floor on metric freshness.
- **Distributed Tracing:** Implementing non-intrusive timestamp injection across asynchronous MQTT queues gave me a practical perspective on telemetry design.

---

## 📄 Read the Full Report & Code

- **GitHub Repository:** [`alehhu/mqtt-faas-hpa-baseline`](https://github.com/alehhu/mqtt-faas-hpa-baseline)
- **Full Report (PDF):** *Establishing a Kubernetes HPA Baseline for MQTT-Driven Serverless Pipelines* (AY 2025–2026)
