# 📘 Jaeger Interview Questions and Answers

---

## ✅ Beginner-Level Questions

### ❓ What is Jaeger and what is it used for?

Jaeger is an open-source **distributed tracing system** used to monitor and troubleshoot **latency and service call flows** in microservices-based architectures.

---

### ❓ What are the core components of the Jaeger architecture?

- **Client Libraries (SDKs)**: Instrument code to create spans  
- **Agent**: Runs as a daemon, receives span data from apps  
- **Collector**: Gathers spans from agents and stores them  
- **Storage Backend**: Elasticsearch, Cassandra, Kafka, etc.  
- **UI**: Web interface to query and visualize traces

---

### ❓ What is the difference between a trace and a span in Jaeger?

- A **trace** represents the **entire request journey** across services.
- A **span** is a **single unit of work** in that trace (e.g., an HTTP call).

---

### ❓ How does Jaeger collect and transmit tracing data?

1. SDKs in the application generate spans  
2. Spans are sent to the **Jaeger Agent**  
3. The agent forwards them to the **Jaeger Collector**  
4. The collector stores them in a **backend like Elasticsearch or Cassandra**

---

### ❓ What is the role of the Jaeger Agent?

The **Agent** receives spans from applications over UDP and forwards them to the **Collector**.

---

### ❓ How is Jaeger different from traditional logging systems?

Traditional logging tools show isolated log lines, while Jaeger connects **end-to-end flows** of a request across microservices to visualize latency and relationships.

---

### ❓ What storage backends are supported by Jaeger?

- ✅ Elasticsearch  
- ✅ Cassandra  
- ✅ Kafka  
- ✅ Badger (for local development)  


---

### ❓ What is the default port for accessing Jaeger UI?

**16686**

---

### ❓ How can you visualize traces in Jaeger?

Go to `http://localhost:16686`, choose your service, and query traces. Click on any trace to view spans and timings.

---

### ❓ What are tags in Jaeger and why are they important?

Tags are **key-value pairs** (e.g., `http.status_code`, `user.id`) added to spans to help **filter, search, and understand trace context**.

---

## ⚙️ Practical / Hands-On Questions

### ⚙️ How do you instrument a Spring Boot application with Jaeger?

1. Add **OpenTelemetry or Jaeger client dependencies**  
2. Define a **Tracer bean**  
3. Use filters or interceptors to start/end spans for HTTP requests  
4. Export spans to the **Jaeger Agent**

---

### ⚙️ What dependencies are required for Jaeger integration in Java?

```xml
<!-- Example for OpenTelemetry -->
<dependency>
  <groupId>io.opentelemetry</groupId>
  <artifactId>opentelemetry-exporter-jaeger</artifactId>
</dependency>
```

## ⚙️ What are the ports used by Jaeger?

| Component        | Port       |
|------------------|------------|
| Jaeger UI        | 16686      |
| Collector HTTP   | 14268      |
| Collector gRPC   | 14250      |
| Agent (UDP)      | 6831 / 6832|
| Query API        | 16686      |

---

## 🧠 How does Jaeger support OpenTelemetry?

Jaeger can receive trace data from **OpenTelemetry SDKs** over **OTLP (gRPC/HTTP)**.  
It acts as a **backend exporter**, enabling full integration with modern observability stacks and standards.

---

## 🧠 How does Jaeger help troubleshoot latency issues in microservices?

Jaeger helps pinpoint latency problems by:

- 🔍 Breaking down traces into individual spans  
- ⏱️ Highlighting duration of each span  
- 🔁 Visualizing service-to-service communication  
- 🧩 Identifying bottlenecks and slow-performing services  

---
## ⚙️ Common Environment Variables to Configure Jaeger

```bash
JAEGER_SERVICE_NAME=my-service
JAEGER_AGENT_HOST=localhost
JAEGER_AGENT_PORT=6831
JAEGER_SAMPLER_TYPE=const
JAEGER_SAMPLER_PARAM=1
SPAN_STORAGE_TYPE=elasticsearch
ES_SERVER_URLS=http://localhost:9200
```
