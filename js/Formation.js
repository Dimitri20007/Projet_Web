import handleAuthCheck from "./utils/auth.js";

document.addEventListener('DOMContentLoaded', function () {
    // Garde l'etat du menu synchronise avec la connexion.
    handleAuthCheck();

    // Les cartes se retournent au clic et au clavier pour rester accessibles.
    const formationCards = document.querySelectorAll('.formation-card');
    formationCards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.classList.toggle('is-flipped');
            }
        });
    });

    // Donnees declaratives: tout le contenu affiche est pilote depuis cet objet.
    const formationSelect = document.getElementById('formation-select');
    const programTitle = document.querySelector('.program-summary h3');
    const durationText = document.querySelector('.program-summary p:nth-of-type(1)');
    const levelText = document.querySelector('.program-summary p:nth-of-type(2)');
    const summaryText = document.querySelector('.program-summary p:nth-of-type(3)');
    const programDetails = document.querySelector('.program-details');

    const formationData = {
        'Master Spécialisé - DevOps': {
            title: 'Master Spécialisé - DevOps',
            duration: '1 an',
            level: 'Bac+5',
            summary: 'Automatisation et déploiement continu',
            details: `
            <p>Ce Master Spécialisé DevOps forme des ingénieurs capables de piloter l'intégralité du cycle de vie d'une application cloud-native, depuis le développement jusqu'à l'exploitation. Le programme combine l'étude des méthodes agiles, de l'automatisation des déploiements, de l'infrastructure as code et de la supervision continue.</p>
            <p>Les étudiants étudient des outils comme Docker, Kubernetes, Terraform et GitLab CI/CD, en travaillant sur des projets concrets de pipeline de déploiement, de gestion des versions et de mise en production automatique. L'objectif est d'apprendre à configurer des environnements reproductibles, sécurisés et évolutifs.</p>
            <p>Le parcours inclut également des volets DevSecOps et monitoring : analyse des risques, intégration de tests automatisés, sécurité des containers, gestion des secrets et mise en place de tableaux de bord de supervision avec Prometheus, Grafana ou ELK.</p>
            <p>Sur le plan des compétences, la formation vise à développer l'esprit d'architecture distribuée, la collaboration inter-équipes, la maîtrise du cloud et des plateformes PaaS, ainsi que la capacité à industrialiser les livraisons pour réduire les délais et améliorer la qualité logicielle.</p>
            <p>Les étudiants réalisent des études de cas réels, des ateliers de troubleshooting et des exercices de déploiement de microservices, ce qui leur permet de comprendre les enjeux de scalabilité, de résilience et d'optimisation des coûts dans un environnement DevOps.</p>
            <p>En sortie de formation, les débouchés comprennent des postes d'Ingénieur DevOps, Architecte Cloud, Responsable automatisation, Consultant infrastructure, ou encore Chef de projet digital spécialisé dans l'industrialisation logicielle.</p>
        `
        },
        'Master Spécialisé - Cloud Computing': {
            title: 'Master Spécialisé - Cloud Computing',
            duration: '1 an',
            level: 'Bac+5',
            summary: 'Architecture et gestion d’infrastructures cloud',
            details: `
            <p>Ce Master Spécialisé Cloud Computing prépare à concevoir et administrer des infrastructures distribuées et des architectures de bout en bout. La formation couvre les services IaaS, PaaS et SaaS, la gestion des containers, la sécurité cloud et les stratégies de haute disponibilité.</p>
            <p>Les étudiants apprennent à déployer des clusters Kubernetes, configurer des réseaux virtuels et optimiser des applications pour le cloud public et privé. Des cas pratiques sur AWS, Azure et Google Cloud permettent de comprendre les différences d'architecture et de fonctionnement entre fournisseurs.</p>
            <p>Le programme inclut l'automatisation avec Terraform et Ansible, la conception de microservices, la gestion de données dans le cloud, les sauvegardes, la reprise après sinistre et la maîtrise des coûts opérationnels.</p>
            <p>Une attention particulière est portée à la sécurité des environnements cloud : chiffrement, authentification, segmentation réseau, gestion des identités et conformité réglementaire.</p>
            <p>La formation permet de se préparer à des missions d'architecte cloud, d'ingénieur infrastructure ou de consultant en transformation numérique, capable d'accompagner les entreprises vers des environnements plus agiles, résilients et performants.</p>
        `
        },
        'Cycle Ingénieur - Développement Web': {
            title: 'Cycle Ingénieur - Développement Web',
            duration: '3 ans',
            level: 'Bac+2',
            summary: 'Maîtrise des technologies web et mobile modernes',
            details: `
            <p>Ce cycle forme des développeurs capables de concevoir des applications web et mobiles de haute qualité. Le cursus couvre les fondamentaux du web, le HTML, CSS et JavaScript, puis se concentre sur les frameworks modernes tels que React, Vue.js, Angular, ainsi que sur le développement back-end avec Node.js, PHP ou Python.</p>
            <p>Les étudiants apprennent à créer des interfaces responsives, des architectures API REST/GraphQL, des bases de données relationnelles et NoSQL, ainsi qu'à gérer les performances, l'accessibilité et la sécurité des applications.</p>
            <p>Le programme inclut des projets pratiques d'e-commerce, de plateforme collaborative et de progressive web app, ainsi que des modules sur l'expérience utilisateur, le SEO et l'optimisation mobile.</p>
            <p>Les apprentissages couvrent également la gestion de versions, l'intégration continue, la conception orientée objet, les tests automatisés et la maintenance d'applications évolutives.</p>
            <p>À l'issue de ce cycle, les diplômés sont préparés à des postes de développeur web, intégrateur, chef de projet digital ou concepteur d'applications cross-platform.</p>
        `
        },
        'Cycle Ingénieur - Cybersécurité': {
            title: 'Cycle Ingénieur - Cybersécurité',
            duration: '3 ans',
            level: 'Bac+2',
            summary: 'Expertise en sécurité des systèmes d’information',
            details: `
            <p>Ce cycle forme des ingénieurs spécialistes de la sécurité des systèmes d'information et de la protection des données. Les cours portent sur la cryptographie, la sécurité réseau, les audits, la sécurité applicative et la gestion des risques.</p>
            <p>Les étudiants apprennent à analyser les menaces, concevoir des architectures sécurisées, mettre en place des politiques de défense, réaliser des tests d'intrusion et répondre à des incidents de cybersécurité.</p>
            <p>La formation inclut des ateliers pratiques de pentesting, configuration de pare-feux, détection des vulnérabilités, chiffrage des données et sécurisation des services cloud.</p>
            <p>Une partie importante du programme est consacrée à la conformité réglementaire, aux normes ISO, RGPD, et aux bonnes pratiques pour la gouvernance de la sécurité.</p>
            <p>Les diplômés peuvent occuper des rôles tels qu'ingénieur sécurité, analyste SOC, consultant en cybersécurité, ou responsable de la sécurité des systèmes d'information.</p>
        `
        },
        'Cycle Ingénieur - Big Data & IA': {
            title: 'Cycle Ingénieur - Big Data & IA',
            duration: '3 ans',
            level: 'Bac+2',
            summary: 'Spécialisation en science des données et intelligence artificielle',
            details: `
            <p>Ce cycle prépare à exploiter et analyser des volumes massifs de données pour en extraire de la valeur. Le programme associe mathématiques, statistiques, apprentissage automatique et technologies Big Data.</p>
            <p>Les étudiants étudient des architectures de traitement de données, des bases de données distribuées, des plateformes Hadoop/Spark, ainsi que des outils de machine learning et de deep learning.</p>
            <p>Le cursus inclut des projets d'analyse prédictive, de reconnaissance de motifs, de traitement du langage naturel et de visualisation de données.</p>
            <p>La formation enseigne également les enjeux éthiques de l'IA, l'explicabilité des modèles et la sécurité des données.</p>
            <p>Les diplômés sont formés pour des rôles de data scientist, ingénieur machine learning, analyste Big Data ou consultant en transformation data-driven.</p>
        `
        },
        'Cycle Préparatoire Intégré': {
            title: 'Cycle Préparatoire Intégré',
            duration: '2 ans',
            level: 'Post-Bac',
            summary: 'Formation de base solide en mathématiques, physique et informatique',
            details: `
            <p>Ce cycle préparatoire intégré offre un socle solide de connaissances en mathématiques, physique et informatique, avec une pédagogie orientée vers l'acquisition de méthodes scientifiques et la résolution de problèmes complexes.</p>
            <p>Les étudiants travaillent sur des modules fondamentaux en algèbre, analyse, mécanique, électromagnétisme et informatique, tout en développant leurs capacités d'expression, de travail en équipe et d'autonomie.</p>
            <p>Le programme propose des TP, des projets interdisciplinaires et des séances de soutien pour maîtriser les concepts essentiels avant l'entrée en cycle ingénieur.</p>
            <p>Les étudiants sont également initiés à l'algorithmique, à la programmation en Python et aux outils de simulation, afin de faciliter la transition vers des spécialisations en ingénierie.</p>
            <p>Ce cycle donne accès aux différentes options du cycle ingénieur, avec un accompagnement personnalisé pour définir son projet professionnel et préparer les concours ou procédures d'admission.</p>
        `
        }
    };

    function updateFormationDetails() {
        // Met a jour la vue a partir de la formation selectionnee.
        const selection = formationSelect.value;
        const data = formationData[selection];
        if (!data) {
            return;
        }

        programTitle.textContent = data.title;
        durationText.innerHTML = `<strong>Durée :</strong> ${data.duration}`;
        levelText.innerHTML = `<strong>Niveau requis :</strong> ${data.level}`;
        summaryText.textContent = data.summary;
        programDetails.innerHTML = data.details;
    }

    formationSelect.addEventListener('change', updateFormationDetails);
    // Initialise la page avec la valeur par defaut du select.
    updateFormationDetails();

    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotChips = document.querySelectorAll('.chatbot-chip');
    const chatbotSubmit = document.querySelector('.chatbot-submit');

    const OPENROUTER_API_KEY = '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';
    const OPENROUTER_MODEL = 'openrouter/free';
    const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
    const OPENROUTER_REFERER = 'http://127.0.0.1:5501';
    const OPENROUTER_TITLE = 'Formation Chatbot';
    const OPENROUTER_TIMEOUT_MS = 7000;
    const CHATBOT_SYSTEM_PROMPT = [
        'Tu es un assistant pour une page de formations Efrei.',
        'Réponds en français de façon claire, utile et concise.',
        'Aide surtout sur les formations, les prérequis, les débouchés et des questions techniques générales sur le web, le cloud, la cybersécurité, DevOps et l’IA.',
        'Si la question dépasse ton périmètre ou si tu n’es pas sûr, dis-le honnêtement et propose une piste utile.',
        'Ne prétends jamais être officiel si tu ne disposes pas d’une source certaine.'
    ].join(' ');

    const conversation = [];

    function renderMessage(text, role, isLoading = false) {
        const message = document.createElement('div');
        message.className = `chatbot-message ${role}${isLoading ? ' loading' : ''}`;
        message.textContent = text;
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return message;
    }

    function setLoadingState(isLoading) {
        chatbotSubmit.disabled = isLoading;
        chatbotSubmit.textContent = isLoading ? 'Envoi...' : 'Envoyer';
        chatbotInput.disabled = isLoading;
        chatbotChips.forEach((chip) => {
            chip.disabled = isLoading;
        });
    }

    function getLocalAnswer(question) {
        const normalizedQuestion = question.toLowerCase();

        if (normalizedQuestion.includes('web')) {
            return 'Pour le développement web, la formation la plus adaptée est le Cycle Ingénieur - Développement Web. Elle couvre HTML, CSS, JavaScript, les frameworks modernes et les bonnes pratiques d’interface et d’API.';
        }

        if (normalizedQuestion.includes('devops') || normalizedQuestion.includes('cloud')) {
            return 'DevOps est centré sur l’automatisation, l’intégration continue et le déploiement. Cloud Computing se concentre davantage sur l’architecture, le déploiement et l’administration des infrastructures cloud. Les deux sont très complémentaires.';
        }

        if (normalizedQuestion.includes('cyber')) {
            return 'La cybersécurité demande un bon socle en réseau, logique et système. Il faut aimer analyser les risques, sécuriser des applications et comprendre les menaces. Le cycle cybersécurité est le plus adapté.';
        }

        if (normalizedQuestion.includes('ia') || normalizedQuestion.includes('intelligence artificielle')) {
            return 'Pour l’IA, la voie Big Data & IA est la plus pertinente. Elle met l’accent sur les données, les algorithmes, le machine learning et les usages concrets de l’intelligence artificielle.';
        }

        return 'Je peux t’aider sur les formations, les débouchés ou des sujets techniques comme le web, le cloud, la cybersécurité, DevOps et l’IA. Reformule ta question avec un peu plus de contexte pour une réponse plus précise.';
    }

    async function askOpenRouter(question) {
        if (!OPENROUTER_API_KEY) {
            return getLocalAnswer(question);
        }

        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), OPENROUTER_TIMEOUT_MS);
        const recentConversation = conversation.slice(-8).map((entry) => ({
            role: entry.role,
            content: entry.text
        }));

        try {
            const response = await fetch(OPENROUTER_ENDPOINT, {
                method: 'POST',
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': OPENROUTER_REFERER,
                    'X-OpenRouter-Title': OPENROUTER_TITLE
                },
                body: JSON.stringify({
                    model: OPENROUTER_MODEL,
                    messages: [
                        { role: 'system', content: CHATBOT_SYSTEM_PROMPT },
                        ...recentConversation,
                        { role: 'user', content: question }
                    ],
                    max_tokens: 180,
                    temperature: 0.2
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`OpenRouter HTTP ${response.status} ${response.statusText}: ${errorText}`);
            }

            const data = await response.json();
            const reply = data?.choices?.[0]?.message?.content?.trim() || data?.choices?.[0]?.text?.trim() || '';

            return reply || getLocalAnswer(question);
        } catch (error) {
            if (error.name === 'AbortError') {
                return getLocalAnswer(question);
            }

            throw error;
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    function seedChatbot() {
        renderMessage('Bonjour. Pose-moi une question sur les formations ou sur un sujet technique. Si la clé OpenRouter est configurée, je réponds via l’API externe.', 'bot');
    }

    seedChatbot();

    chatbotChips.forEach((chip) => {
        chip.addEventListener('click', () => {
            chatbotInput.value = chip.textContent;
            chatbotInput.focus();
        });
    });

    async function handleChatbotSubmit(event) {
        event.preventDefault();

        const question = chatbotInput.value.trim();
        if (!question) {
            return;
        }

        chatbotInput.value = '';
        conversation.push({ role: 'user', text: question });
        renderMessage(question, 'user');

        const loadingMessage = renderMessage('Réflexion en cours...', 'bot', true);
        setLoadingState(true);

        try {
            const answer = await askOpenRouter(question);
            loadingMessage.remove();
            renderMessage(answer, 'bot');
            conversation.push({ role: 'assistant', text: answer });
        } catch (error) {
            loadingMessage.remove();
            console.error('OpenRouter error:', error);
            const fallbackAnswer = getLocalAnswer(question);
            renderMessage(fallbackAnswer, 'bot');
            conversation.push({ role: 'assistant', text: fallbackAnswer });
        } finally {
            setLoadingState(false);
            chatbotInput.focus();
        }
    }

    chatbotForm.addEventListener('submit', handleChatbotSubmit);
});