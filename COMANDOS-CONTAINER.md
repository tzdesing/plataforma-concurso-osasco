# 🐳 Comandos para Encontrar e Acessar Container

## 🔍 **1. Encontrar o Nome do Container:**

### **Listar todos os containers:**
```bash
docker ps
```

### **Listar containers da aplicação:**
```bash
docker ps | grep plataforma
```
ou
```bash
docker ps | grep concurso
```
ou
```bash
docker ps | grep rws8g4w8sook84g48cgko8go
```

### **Listar containers do Coolify:**
```bash
docker ps | grep coolify
```

## 📋 **2. Identificar o Container Correto:**

O container da aplicação geralmente tem um nome como:
- `rws8g4w8sook84g48cgko8go-[números]`
- `plataforma-concurso-osasco-[hash]`
- Ou similar com o UUID do Coolify

## 🚀 **3. Comandos Úteis:**

### **Acessar o container (bash):**
```bash
docker exec -it [CONTAINER_NAME] bash
```

### **Executar comandos diretamente:**
```bash
# Aplicar schema do banco
docker exec -it [CONTAINER_NAME] npx prisma db push

# Executar seed
docker exec -it [CONTAINER_NAME] npx prisma db seed

# Ver logs da aplicação
docker logs [CONTAINER_NAME] -f

# Verificar se aplicação está rodando
docker exec -it [CONTAINER_NAME] ps aux
```

## 🔧 **4. Comandos Específicos para Prisma:**

### **Dentro do container:**
```bash
# Entrar no container
docker exec -it [CONTAINER_NAME] bash

# Dentro do container:
cd /app
npx prisma db push
npx prisma db seed
npx prisma studio --port 5555
```

### **Direto (sem entrar no container):**
```bash
docker exec -it [CONTAINER_NAME] npx prisma db push
docker exec -it [CONTAINER_NAME] npx prisma db seed
```

## 📊 **5. Verificar Status:**

### **Ver logs em tempo real:**
```bash
docker logs [CONTAINER_NAME] -f
```

### **Verificar se aplicação responde:**
```bash
curl http://localhost:3000
# ou
curl http://[SEU-DOMINIO]
```

### **Ver processos no container:**
```bash
docker exec -it [CONTAINER_NAME] ps aux
```

## 🎯 **6. Exemplo Prático:**

```bash
# 1. Encontrar container
docker ps

# Output exemplo:
# CONTAINER ID   IMAGE                    COMMAND       CREATED        STATUS        PORTS                    NAMES
# abc123def456   rws8g4w8sook84g48cgko8go:latest   "node server.js"   2 minutes ago   Up 2 minutes   0.0.0.0:3000->3000/tcp   rws8g4w8sook84g48cgko8go-205728350816

# 2. Usar o nome do container
docker exec -it rws8g4w8sook84g48cgko8go-205728350816 bash

# 3. Dentro do container
npx prisma db push
npx prisma db seed
```

## 🚨 **7. Se não encontrar o container:**

### **Verificar se está rodando:**
```bash
docker ps -a  # Mostra todos, incluindo parados
```

### **Verificar logs do Coolify:**
- No dashboard do Coolify
- Ir para a aplicação
- Ver logs de deployment

### **Reiniciar aplicação:**
- No Coolify: clicar em "Restart"
- Ou fazer novo deploy

## 💡 **8. Dicas:**

### **Usar autocomplete:**
```bash
docker exec -it rws<TAB>  # Pressionar TAB para autocompletar
```

### **Salvar nome em variável:**
```bash
CONTAINER=$(docker ps | grep rws8g4w8 | awk '{print $NF}')
docker exec -it $CONTAINER npx prisma db push
```

### **Comando mais simples:**
```bash
# Se só tem um container rodando
docker exec -it $(docker ps -q) npx prisma db push
```

---

**Execute `docker ps` primeiro e me mande o resultado para te ajudar com o nome exato!** 🚀
