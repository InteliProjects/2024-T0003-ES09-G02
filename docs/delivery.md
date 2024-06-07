# Plano de Delivery

# 1. Definição de ambientes
Em nosso processo de desenvolvimento de software, adotamos uma abordagem baseada na metodologia GitFlow, utilizando o Git como nossa principal ferramenta de controle de versão. Embora tradicionalmente a divisão de ambientes seja uma prática comum para garantir a qualidade do software em diferentes estágios, como desenvolvimento e produção, nossa equipe optou por adaptar essa abordagem de forma mais flexível e leve, considerando nossas necessidades e fluxo de trabalho.
Neste contexto, as branches do Git desempenham um papel fundamental, servindo não apenas como contêineres para diferentes versões do código-fonte, mas também como espaços de trabalho distintos, cada um representando um estágio específico no ciclo de vida do desenvolvimento de software. Podemos fazer uma analogia entre essas branches e os ambientes tradicionais, onde cada uma reflete um conjunto único de mudanças, funcionalidades em desenvolvimento e níveis de estabilidade.

Logo, a branch que representa o ambiente virtual de "desenvolvimento" é a "develop", e a branch que representa o ambiente virtual de "produção" é a "main":

## 1.1 Branch develop como Ambiente de Desenvolvimento:
Seguindo o GitFlow, a develop é usada como a branch principal para o desenvolvimento contínuo. 
Nela, trabalhamos em novos recursos, correções de bugs e documentação do projeto. 
Um espaço de trabalho onde as mudanças são desenvolvidas e testadas localmente pelos desenvolvedores antes de serem integradas ao projeto oficial, presente na main.

## 1.2 Branch main como Ambiente de Produção:
Seguindo o GitFlow, a main é a branch principal que reflete o estado atual do código que estaria em produção. 
Ela pode ser considerada o ambiente de produção, onde o código estável e testado é implantado e disponibilizado para os usuários finais.
A cada final de sprint, a main é atualizada a partir da develop- pelo scrum master - com todo o conteúdo desenvolvido na sprint

# 2. Processo para Alteração na Infraestrutura

Para realizar alterações na infraestrutura, é necessário seguir algumas boas práticas, a fim de garantir a segurança e integridade do sistema.
Abaixo, segue um passo a passo para realizar alterações na infraestrutura:

<li>Antes de começar qualquer alteração na infraestrutura, é importante entender claramente qual é a alteração necessária. Isso pode envolver adicionar recursos, atualizar componentes, escalonar para lidar com mais tráfego, etc.

<li>Determine o impacto da alteração na infraestrutura. Isso inclui considerar questões como custo, tempo, recursos necessários, compatibilidade com sistemas existentes e potencial impacto nos usuários finais.

<li>Elabore um plano detalhado de como realizar a alteração. Isso pode incluir definir as etapas necessárias, os recursos necessários, a ordem de operações e os cronogramas.

<li>Faça backups completos dos dados e configurações existentes. Isso é essencial para garantir que você possa reverter para um estado funcional anterior, se necessário.

<li>Siga o plano elaborado na etapa de planejamento para realizar a alteração na infraestrutura. Isso pode incluir configuração de redes, instalação de software, etc.

<li>Após implementar as alterações, realize testes abrangentes para garantir que tudo funcione conforme o esperado. Isso pode envolver testes de integração, testes de carga, testes de desempenho, etc.

<li>Implemente sistemas de monitoramento para acompanhar o desempenho da nova infraestrutura. Isso ajudará a identificar quaisquer problemas ou gargalos que possam surgir após a alteração.

<li>Documente todas as alterações feitas na infraestrutura, incluindo os motivos para as mudanças, os passos realizados e quaisquer problemas encontrados durante o processo. Isso ajudará a equipe a entender e dar suporte à nova configuração no futuro.

# 3. Processo para Alteração de Artefatos de Software em Produção

Para realizar alterações em ambiente produtivo, é necessário seguir algumas boas práticas, a fim de garantir a segurança e integridade do sistema.
Abaixo, segue um passo a passo para realizar alterações no ambiente produtivo:

<li> Certifique-se de utilizar o controle de versão para gerenciar as alterações no código fonte. Utilize branches para desenvolver novas funcionalidades e realizar correções de bugs.
<li> Após certificar-se de que as alterações estão prontas para serem implementadas, realize o merge do branch de desenvolvimento para o branch de produção.
<li> Antes de realizar a implantação, é importante realizar testes em um ambiente de homologação para garantir que as alterações não causarão problemas no ambiente produtivo.
<li> Atualize o código na instância de produção, e faça o deploy da aplicação utilizando o docker.

# 4. Plano de Rollback

## 4.1 Introdução

A definição do nosso plano de rollback é essencial, pois com ele garantimos a estabilidade e a confiabilidade de nosso sistema. Quando uma atualização ou implantação do software causa problemas críticos que passaram pelos testes automatizados, ter um plano claro e bem definido para reverter para o estado anterior pode ser a diferença entre um breve contratempo e uma interrupção prolongada dos negócios que cause muitas consequências de curto e longo prazo. 
Neste plano de rollback, apresentamos os passos necessários para reverter o nosso software para um estado estável anterior em caso de problemas críticos na plataforma de CXM da Track. 
Esperamos que com essa abordagem cuidadosa, possamos minimizar os impactos negativos e restaurar a funcionalidade essencial rapidamente. Este plano de rollback será apresentado em um formato de passo-a-passo, com o objetivo de detalhar as equipes envolvidas e suas respectivas responsabilidades. 
Nosso objetivo é tornar o plano de rollback claro e fácil de ser interpretado, garantindo que cada equipe saiba exatamente o que deve fazer em caso de necessidade de reversão.
### 1. Identificação de Problemas

**Importância:** Definição de critérios claros para determinar quando um rollback é necessário, garantindo que apenas problemas críticos recebam essa ação.

- A equipe de monitoramento detecta um problema crítico que afeta a funcionalidade essencial da plataforma de CXM da Track, como falhas em na criaçãa de pesquisas, na exibição de dashboards, no envio da distribuição ou na interação do usuario com a pesquisa NPS.
- Os critérios para identificação de problemas críticos foram definidos e comunicados à equipe, eles são:

1. **Impacto no Usuário Final:**
   - Problemas que afetam diretamente a experiência do usuário final, como falhas em funcionalidades essenciais da plataforma CXM, devem ser considerados críticos.

2. **Perda de Dados ou Informações Sensíveis:**
   - Qualquer problema que resulte na perda de dados importantes ou na exposição de informações sensíveis deve ser tratado como crítico.

3. **Impacto nos Resultados de Negócios:**
   - Problemas que têm um impacto significativo nos resultados de negócios, como perda de receita ou oportunidades, devem ser considerados críticos.

4. **Disponibilidade e Acessibilidade do Sistema:**
   - Problemas que resultam na falta de disponibilidade ou acessibilidade do sistema para os usuários devem ser tratados como críticos.

5. **Regulamentações e Conformidade:**
   - Problemas que violam regulamentações ou comprometem a conformidade com padrões de segurança e privacidade devem ser considerados críticos.

6. **Reputação da Empresa:**
   - Problemas que têm um impacto significativo na reputação da empresa perante os clientes e o público em geral devem ser tratados como críticos.

8. **Feedback da Equipe de Monitoramento:**
   - Qualquer alerta ou feedback da equipe de monitoramento que indique um problema crítico deve ser considerado como tal.

9. **Histórico de Problemas Similares:**
    - Problemas que são recorrentes ou têm um histórico de impacto significativo devem ser considerados críticos.

## 4.2 Comunicação
**Importância:** A comunicação rápida e eficaz é fundamental para garantir que todas as equipes relevantes sejam informadas e possam agir prontamente.

- A equipe de DevOps é notificada imediatamente sobre a necessidade de um rollback.
- Um comunicado é enviado para todas as equipes relevantes informando sobre o rollback iminente e seus motivos.

## 4.3 Preparação
**Importância:** Verificar a disponibilidade e integridade dos backups garante que o sistema possa ser restaurado com segurança em caso de rollback.

- A equipe de DevOps verifica a disponibilidade e integridade dos backups do ambiente de produção.
- Todos os processos em andamento são pausados ou concluídos de forma segura.

## 4.4 Execução do Rollback

**Importância:** Definir o processo cuidadoso de reverter o código, restaurar o banco de dados e reconfigurar as configurações garante que o sistema retorne a um estado funcional conhecido.

- O ambiente de produção é colocado em modo de manutenção para evitar interações externas durante o rollback.
- Os seguintes passos são executados:
   1. Reversão do código para a versão anterior através de controle de versão pelo Git.
   2. Restauração do banco de dados postgress para o estado anterior a partir do backup mais recente.
   3. Reconfiguração de quaisquer outras configurações que foram alteradas durante a implantação e do ultima alteração para a branch de produção.
   4. Reinício dos serviços necessários.

## 4.5 Testes de Rollback
**Importância:** Os testes garantem que o sistema restaurado funcione corretamente e que as funcionalidades afetadas estejam operando conforme o esperado.

- A equipe de QA realiza testes automatizados para garantir que o ambiente restaurado esteja funcionando corretamente.
- São realizados testes específicos para verificar se as funcionalidades afetadas estão operando conforme o esperado.

## 4.6 Monitoramento Pós-Rollback

**Importância:** Monitorar de perto o sistema após o rollback ajuda a detectar problemas adicionais e garantir sua estabilidade contínua.

- O ambiente de produção é monitorado de perto para detectar quaisquer problemas adicionais após o rollback.
- São estabelecidos alertas para detectar rapidamente quaisquer anomalias.

## 4.7 Análise Pós-Mortem

**Importância:** Identificar a causa raiz do problema e implementar medidas preventivas ajudará a evitar recorrências no futuro, fortalecendo a resiliência do sistema.

- Uma análise pós-mortem é conduzida para identificar a causa raiz do problema que levou ao rollback.
- São propostas e implementadas medidas preventivas para evitar recorrências no futuro.
- Passo a passo da análise pós-mortem:

1. **Coleta de Dados:**
   - Revisão dos registros de incidentes, registros de monitoramento, registros de alterações e qualquer outra fonte relevante de informações como feedbacks e reporte de bug dos usuarios.

2. **Identificação do Problema:**
   - Definição clara do problema que levou ao rollback, incluindo suas manifestações, impacto e duração.

3. **Determinação da Causa Raiz:**
   - Realização de uma análise detalhada para identificar a causa raiz do problema.

4. **Análise de Impacto:**
   - Avaliação do impacto do problema nos usuários, no sistema e nos negócios, incluindo custos associados e repercussões.

5. **Proposição de Soluções:**
   - Desenvolvimento de soluções para corrigir a causa raiz do problema e evitar recorrências, incluindo melhorias nos processos, na infraestrutura ou no código.

6. **Implementação de Medidas Corretivas:**
   - Implementação das soluções propostas, com acompanhamento da equipe de monitoramento para garantir sua eficácia.

7. **Documentação e Compartilhamento de Aprendizados:**
   - Documentação de todas as descobertas, soluções e aprendizados da análise pós-mortem, compartilhando-os com a equipe para aprendizado e melhoria contínua.

8. **Avaliação das Medidas Preventivas:**
   - Monitoramento contínuo para avaliar a eficácia das medidas preventivas implementadas e ajustá-las conforme necessário.

## 4.8 Conclusão
Em conclusão, um plano de rollback bem elaborado é uma parte essencial para a de implantação do nosso sistema, pois nos fornece uma rede de segurança valiosa para garantir que, em caso de problemas, possamos reverter para um estado estável anterior de forma rápida e eficiente. 
Ao seguir os passos delineados neste plano, podemos garantir que a plataforma permaneça operacional e estável, mesmo em face de desafios imprevistos. 
A implementação rigorosa deste plano, juntamente com o seguimento da análise pós-mortem definida, permite a equipe aprender com os erros e melhorar continuamente os processos para evitar rollbacks no futuro.
