# Diagrama BPMN

O diagrama descreve o fluxo de processo para gestão e resposta a incidentes em um ambiente de produção. Ele envolve etapas para identificação de problemas críticos, comunicação dentro da equipe de DevOps e decisão sobre a necessidade de um rollback baseado na gravidade do problema. O processo inclui etapas de preparação, como garantir que os backups estão prontos, executar o rollback se necessário e testar para confirmar o sucesso do rollback. Após o rollback, o processo envolve monitoramento, análise de quaisquer erros nos backups, implementação de medidas corretivas e documentação de lições aprendidas. Após essas etapas, existe uma avaliação de medidas preventivas para evitar incidentes futuros. Esse tipo de fluxograma é essencial para manter a estabilidade operacional e a rápida recuperação de problemas críticos no nosso sistema da Track. Segue imagem do diagrama:

![cross-functional-flowchart-track ](https://github.com/Inteli-College/2024-T0003-ES09-G02/assets/99202553/1b0bdbd1-456a-4e78-aa8c-3d50ca47a932)

# Planilha SLA

O Acordo de Nível de Serviço (SLA) documenta as métricas-chave que definem o sucesso da entrega dos serviços de backend e frontend de uma plataforma. Ele estabelece metas claras, como a taxa de sucesso de requisições e tempos de resposta, garantindo que a performance do sistema atenda às expectativas de desempenho e disponibilidade. Quando esses objetivos não são atingidos, ações corretivas são delineadas para otimizar os sistemas e melhorar a resiliência e eficiência da infraestrutura, garantindo a satisfação do usuário e a continuidade do negócio.

Em seguida exibimos o SLA do nosso projeto: 

| Componente                          | Descrição                                  | Métrica de Desempenho        | Meta de SLA         | Desempenho Real médio | Ações corretivas                      |
|-------------------------------------|--------------------------------------------|------------------------------|---------------------|----------------------|----------------------------------------|
| Código de Resposta do Backend       | Monitorar status HTTP das respostas do backend | Taxa de sucesso das requisições | ≥ 99% respostas     | 97%                  | Analisar logs para identificar causas de erros e otimizar |
| Tempo de Resposta do Backend        | Avaliar a latência do backend               | Tempo médio de resposta       | < 500 ms            | 650 ms               | Otimizar código do backend e infraestrutura |
| Performance do sistema              | Carga de trabalho do serviço de backend    | Contagem de requisições       | Capacidade adequada para pico de demanda | Alta demanda nos horários de pico | Aumentar recursos durante picos de demanda, utilização do EC2 com autoscaling |
| Tempo de Renderização do Frontend   | Impacto no tempo de carregamento no usuário | Tempo de renderização         | < 2 s               | 3 s                  | Otimizar arquivos estáticos e scripts do frontend |
| Número de Usuários Ativos           | Utilização do sistema e engajamento do usuário | Número de usuários ativos     | Crescimento constante de usuários ativos | Houve um crescimento de acessos ao longo do tempo | Investir cada vez mais na usabilidade da plataforma para engajar mais usuários |
| Disponibilidade da plataforma       | Acesso contínuo ao serviço                  | Percentagem de uptime do sistema | 99% uptime       | 99.999999999%       | Implementar arquitetura AWS |
| Sobrecarga do servidor              | Resiliência sob alta carga                 | Tempo médio de resposta da API | Menos de 4 segundos | 19 s                | Otimizar a infraestrutura e balanceamento de carga |

### Matriz de severidade
O mapa de severidade é um componente crucial do nosso SLA de sustentação, desenhado para orientar a priorização dos chamados de suporte. Ele leva em conta não apenas a urgência de cada situação, mas também o impacto potencial sobre as operações da empresa. Ao classificar os chamados segundo sua criticidade, podemos assegurar que os recursos sejam alocados eficazmente e que as questões mais prementes sejam resolvidas primeiro, mantendo a integridade e a continuidade dos serviços essenciais.
![Evidencia medição](./assets/Captura%20de%20tela%202024-04-11%20012044.png)


# Matriz RACI

Focando no caso de um incidente em produção, podemos detalhar algumas atividades envolvidas durante a ocorrência, e também elicitar quais equipes estarão envolvidas no plano de rollback, seguindo os conceitos da RACI.

Nesse processo teremos a Equipe de Monitoramento, Desenvolvedores, QAs e Gerente de Projetos. A partir disso, podemos definir processos onde cada equipe sabe exatamente seu papel de atuação.

| Atividade                                             | Equipe de Monitoramento | Desenvolvedores | QA | Gerente de Projetos |
|-------------------------------------------------------|-----------------------------------|---------------------------|--------------|-------------------------------|
| Identificação de Problemas                            | R                                 | C                         | I            | A                             |
| Comunicação com a Equipe de DevOps                    | A                                 | R                         | C            | I                             |
| Preparação (Disponibilidade e Integridade dos Backups)| C                                 | A                         | I            | R                             |
| Execução do Rollback (Reverter o Código)              | I                                 | R                         | A            | C                             |
| Testes de Rollback                                    | C                                 | I                         | R            | A                             |
| Monitoramento Pós-Rollback                            | R                                 | I                         | A            | C                             |
| Análise Pós-Mortem                                    | I                                 | C                         | R            | A                             |
| Implementação das Medidas Corretivas                                  | I                                 | R                         | C           | A                             |
| Documentação e Compartilhamento de Aprendizados                                 | I                                 | A                         | C           | R                             |
| Avaliação das Medidas Preventivas                                 | R                                 | I                         | C           | A                             |


