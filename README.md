# Sistema Balcão UFF

O sistema Balcão UFF visa fomentar a colaboração e o senso de comunidade, além de promover a
sustentabilidade e a economia circular dentro do ambiente universitário, oferecendo um ambiente
virtual seguro e controlado, onde alunos, professores e funcionários podem trocar, vender ou doar
bens e serviços de forma prática e confiável.

## Projeto
Realizado para as disciplinas de GPMS e de Dev Web Avançado. Referente ao período 2024.2.


## Como executar

Para executar a aplicação é necessário ter na máquina instalado docker. Uma vez instalado, basta rodar a seguinte linha de código no powershell para subir a aplicação:

```bash
docker-compose up --build
```

Agora para descer a aplicação, e limpar o banco que foi criado:

```bash
docker-compose down --volumes
```

Caso esteja pelo WSL, e provavelmente o linux é necessário utilizar o comando com **sudo**, se não, não terá permissão para rodar o comando.

Para caso de popular o banco de dados, será criado um arquivo à que fará a população do banco. Que bastará a seguinte operação para popular o banco, uma vez que o mesmo esteja executando:

```bash
python populate.py
```

