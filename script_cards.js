const perfis = [
    {
        nomeIdade: "Ciclano, 19",
        cursoSigla: "CCH",
        cursoNome: "Biblioteconomia",
        foto: "img/ciclano.png", 
        coisasQueAma: [
            "Organizar livros por cor (mesmo sabendo que é antiético pra biblioteconomia)",
            "Cultura pop com letra depressiva",
            "Memes intelectuais"
        ],
        sobreMim: "\"Leio tudo que vejo pela frente, inclusive entrelinhas de mensagens de bom dia.\"",
        moodAtual: "\"Disposto a recomendar um livro pra cada pessoa que der match.\""
    },
    {
        nomeIdade: "Fulana, 21",
        cursoSigla: "CCET",
        cursoNome: "Matemática",
        foto: "img/fulana.png",
        coisasQueAma: [
            "Cálculo e seus desafios",
            "Sair a noite",
            "Cuidar de planta"
        ],
        sobreMim: "\"Minha vida é 80% concreto e 20% desespero.\"",
        moodAtual: "\"Procurando alguém para me ajudar a entender Estatística.\""
    },
    {
        nomeIdade: "Beltrano, 20",
        cursoSigla: "CCH",
        cursoNome: "História",
        foto: "img/beltrano.png", 
        coisasQueAma: [
            "Avaliar filmes no Letterbox",
            "Música indie underground",
            "Fazer networking em eventos"
        ],
        sobreMim: "\"Otimizando minha vida pessoal com a mesma eficiência que uma planilha do Excel.\"",
        moodAtual: "\"Ansioso para o próximo churrasco da atlética.\""
    }
];

let indiceAtual = 0;


function renderizarCard(perfil) {
    const card = document.querySelector('.profile-card');

    if (!card) {
        console.error("Elemento .profile-card não encontrado. Verifique se o HTML está carregado.");
        return;
    }

    const img = card.querySelector('.profile-avatar');
    if (img) {
        img.src = perfil.foto;
        img.alt = `Foto de ${perfil.nomeIdade.split(',')[0]}`;
    }
    

    const h2 = card.querySelector('h2');
    if (h2) {
        h2.textContent = perfil.nomeIdade;
    }


    const pElements = card.querySelectorAll('.profile-left p');
    if (pElements.length >= 2) {
        pElements[0].textContent = perfil.cursoSigla;
        pElements[1].textContent = perfil.cursoNome;
    }

    const ul = card.querySelector('.profile-right ul');
    if (ul) {
        const listaAmores = perfil.coisasQueAma.map(item => `<li>${item}</li>`).join('');
        ul.innerHTML = listaAmores;
    }


    const rightP = card.querySelectorAll('.profile-right p');
    if (rightP.length >= 2) {
        rightP[0].textContent = perfil.sobreMim;
        rightP[1].textContent = perfil.moodAtual;
    }
}


function proximoPerfil() {
    indiceAtual = (indiceAtual + 1) % perfis.length;
    renderizarCard(perfis[indiceAtual]);
}


const btnRejeitar = document.querySelector('.btn-reject'); 
const btnAceitar = document.querySelector('.btn-accept'); 


if (btnRejeitar) {
    btnRejeitar.addEventListener('click', proximoPerfil);
}

if (btnAceitar) {
    btnAceitar.addEventListener('click', proximoPerfil);
}


window.onload = function() {
    renderizarCard(perfis[indiceAtual]);
};