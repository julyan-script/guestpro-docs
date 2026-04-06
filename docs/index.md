---
sidebar_position: 1
sidebar_label: System Architecture
description: "Overview of GuestPro Platform architecture: Push Integration and Pull Integration data loops."
---

# System Architecture

The GuestPro Platform operates as a centralized **Synchronization Hub**. The architecture is defined by two distinct data loops: **Push Integration** and **Pull Integration**.

These loops ensure that while the PMS proactively updates external channels via Outbound flow, external frontends or systems can interact with the PMS via Inbound flow.

![System Architecture Diagram](/img/docs/architecture.png)

## Push Integration

**Push Integration** is proactive and event-driven. It is designed for updates where the PMS sends data or state change to external systems.

- **Trigger/Initiator**: Changes availability, rate, reservation, or inventory within the PMS.
- **Execution**: Data is pushed from the PMS to external endpoints via `HTTP` request.

This is a standard practice that is commonly used by third parties or external systems.

## Pull Integration

**Pull Integration** is an active-request model. It is designed for external systems that actively send requests to the PMS through the Open-API to retrieve near/real-time data.

- **Trigger/Initiator**: The external system proactively triggers the data flow based on user interaction or system needs. All communication is funneled through the Open-API endpoints.
- **Execution**: The external system sends `HTTP` requests. PMS receives these requests and dynamically computes data and business logic.

This is a standard practice that is commonly used by clients/property who have already subscribed to GuestPro PMS.