

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const alunos = [];
const TOTAL_ALUNOS = 5;

// Funcao para fazer perguntas no terminal
function perguntar(texto) {
    return new Promise((resolve) => {
        rl.question(texto, resolve);
    });
}

// Funcao para ler uma nota valida
async function lerNota(texto) {
    while (true) {
        const resposta = await perguntar(texto);
        const nota = Number(resposta.replace(",", "."));

        if (
            resposta.trim() !== "" &&
            Number.isFinite(nota) &&
            nota >= 0 &&
            nota <= 10
        ) {
            return nota;
        }

        console.log("Digite uma nota valida entre 0 e 10.");
    }
}

// Funcao para calcular a media
function calcularMedia(aluno) {
    return (aluno.nota1 + aluno.nota2) / 2;
}

// Funcao para verificar a situacao
function verificarSituacao(media) {
    if (media >= 7) {
        return "Aprovado";
    }

    return "Reprovado";
}

// Funcao para cadastrar os alunos
async function cadastrarAlunos() {
    console.log("=== SISTEMA ACADEMICO ===");

    for (let i = 0; i < TOTAL_ALUNOS; i++) {
        console.log(`\nCadastro do aluno ${i + 1}`);

        let nome = "";

        while (!nome.trim()) {
            nome = await perguntar("Nome: ");

            if (!nome.trim()) {
                console.log("O nome e obrigatorio.");
            }
        }

        let matricula = "";

        while (!matricula.trim()) {
            matricula = await perguntar("Matricula: ");

            if (!matricula.trim()) {
                console.log("A matricula e obrigatoria.");
            }
        }

        const nota1 = await lerNota("Primeira nota: ");
        const nota2 = await lerNota("Segunda nota: ");

        alunos.push({
            nome: nome.trim(),
            matricula: matricula.trim(),
            nota1: nota1,
            nota2: nota2
        });
    }

    apresentarAlunos();
}

// Funcao para apresentar os resultados
function apresentarAlunos() {
    let aprovados = 0;
    let reprovados = 0;
    let somaMedias = 0;

    console.log("\n=== RESULTADO ACADEMICO ===");

    for (const aluno of alunos) {
        const media = calcularMedia(aluno);
        const situacao = verificarSituacao(media);

        console.log("\n----------------------------");
        console.log(`Nome: ${aluno.nome}`);
        console.log(`Matricula: ${aluno.matricula}`);
        console.log(`Nota 1: ${aluno.nota1}`);
        console.log(`Nota 2: ${aluno.nota2}`);
        console.log(`Media: ${media.toFixed(2)}`);
        console.log(`Situacao: ${situacao}`);

        somaMedias += media;

        if (situacao === "Aprovado") {
            aprovados++;
        } else {
            reprovados++;
        }
    }

    console.log("\n=== RESUMO DA TURMA ===");
    console.log(`Total de alunos: ${alunos.length}`);
    console.log(`Aprovados: ${aprovados}`);
    console.log(`Reprovados: ${reprovados}`);
    console.log(
        `Media geral: ${(somaMedias / alunos.length).toFixed(2)}`
    );
}

// Inicia o programa
cadastrarAlunos()
    .catch((erro) => {
        console.error("Erro:", erro.message);
    })
    .finally(() => {
        rl.close();
    });