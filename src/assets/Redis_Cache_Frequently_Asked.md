
# Redis Caching with Spring Boot – Interview Questions & Answers

## ✅ Beginner-Level Questions

### ❓ What is Redis and how is it used in Spring Boot applications?
Redis is an in-memory key-value store. In Spring Boot, it’s used as a cache to improve performance by avoiding repeated database calls.

---

### ❓ What are the benefits of using Redis for caching?
Fast access (in-memory), reduces DB load, supports TTL, persistence, and can scale in distributed systems.

---

### ❓ How do you enable caching in a Spring Boot application?
Add `@EnableCaching` in the main class and use annotations like `@Cacheable` on methods.

---

### ❓ What dependencies are required to use Redis caching in Spring Boot?

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

### ❓ What does the `@EnableCaching` annotation do?
It enables Spring’s cache abstraction, allowing annotations like `@Cacheable`, `@CachePut`, and `@CacheEvict` to work.

---

### ❓ What are `@Cacheable`, `@CachePut`, and `@CacheEvict` used for?

- **`@Cacheable`**: Checks if the result is in the cache; if not, it calls the method and stores the result in the cache.
- **`@CachePut`**: Always executes the method and updates the cache with the result.
- **`@CacheEvict`**: Removes the specified entry (or all entries) from the cache.

---

### ❓ How does the `@Cacheable` annotation work under the hood?
It checks if the cache already contains a value for the given key:
- If **yes**, returns the cached result without executing the method.
- If **no**, executes the method, stores the result in the cache, and returns the result.

---

### ❓ What is the default key generation strategy in Spring Cache?
Spring uses `SimpleKeyGenerator` by default:
- If there is one method parameter, that parameter is used as the key.
- If multiple parameters, a composite key is generated.
- If no parameters, a singleton key `SimpleKey.EMPTY` is used.

---

## ⚙️ Hands-On / Practical Questions

### ⚙️ How do you cache the result of a method using Redis in Spring Boot?

```java
@Cacheable(value = "users", key = "#userId")
public User getUser(Long userId) {
    // method logic
}
```
---

## 🧠 Intermediate-Level Questions

### 🧠 What are the differences between `RedisTemplate` and `CacheManager` in Spring?

- **RedisTemplate**: A low-level abstraction to interact with Redis directly using operations like `get`, `set`, `hash`, `list`, etc.
- **CacheManager**: A high-level abstraction used in Spring’s caching framework, mainly with annotations like `@Cacheable`, `@CacheEvict`, and `@CachePut`.

---


### 🧠 How do you implement a custom key generator in Spring Boot caching?

```java
@Bean
public KeyGenerator customKeyGenerator() {
    return (target, method, params) -> {
        return method.getName() + "_" + Arrays.toString(params);
    };
}
```
---

### 🧠 How do you implement a cache fallback mechanism when Redis is down?

- Use `try-catch` blocks around cacheable methods to catch exceptions.
- Fallback to a database call or an in-memory alternative to fetch data.
- Use resilience libraries such as **Resilience4j** or **Hystrix** to handle fallback scenarios gracefully.

---

### 🧠 What are potential issues with Redis cache in a distributed system?

- **Stale data** due to infrequent or delayed updates to the cache.
- **Cache stampede** when many requests simultaneously miss the cache and hit the database.
- **Network latency or Redis unavailability**, especially in cloud or multi-region setups.
- **Improper eviction policies** or **key collisions**, which can lead to unexpected cache behavior or data loss.

---

### 🧠 How do you implement a custom key generator in Spring Boot caching?

```java
@Bean
public KeyGenerator customKeyGenerator() {
    return (target, method, params) -> {
        return method.getName() + "_" + Arrays.toString(params);
    };
}
```
Use it like this:
```java
@Cacheable(value = "customCache", keyGenerator = "customKeyGenerator")
public String fetchData(String input) {
    // method logic
}
```
---
### 🧠 How can you conditionally cache a method result using `@Cacheable`?

```java
@Cacheable(value = "products", condition = "#id > 10")
public Product getProduct(Long id) {
    // method logic
}
```



## ⚙️ Hands-On / Practical Questions

### ⚙️ How do you configure Redis connection settings in `application.properties` or `.yml`?

```properties
spring.redis.host=localhost
spring.redis.port=6379
```

### ⚙️ How do you set a custom Time-To-Live (TTL) for Redis cache entries?

```java
@Bean
public RedisCacheConfiguration cacheConfiguration() {
    return RedisCacheConfiguration.defaultCacheConfig()
        .entryTtl(Duration.ofMinutes(10));
}
```
---

### ⚙️ How do you evict a specific cache entry manually?

```java
@CacheEvict(value = "users", key = "#userId")
public void deleteUser(Long userId) {
    // delete logic
}
```
---

### ⚙️ How do you clear all entries from a cache?

```java
@CacheEvict(value = "users", allEntries = true)
public void clearAll() {
    // clearing logic
}
```
---

## ⚙️ How can you cache the result of a REST API call?

Wrap the REST call logic inside a service method and annotate that method with `@Cacheable`.

---

### ⚙️ How do you verify that Redis caching is working (via logs or Redis CLI)?

Use Redis CLI commands:

```shell
KEYS *
GET <key>
MONITOR
INFO
```

---


