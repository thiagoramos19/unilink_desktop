document.addEventListener('DOMContentLoaded', () => {
    const concluirButton = document.querySelector('.button-concluir');
    const voltarButton = document.querySelector('.button-voltar');

    const coisasTextarea = document.querySelector('.bio-block textarea.editable-textarea');
    const fraseInput = document.querySelector('.bio-block input[type="text"][placeholder="Descreva-se em uma frase."]');
    const moodInput = document.querySelector('.bio-block input[type="text"][placeholder="Qual seu mood atual?"]');

    const profilePageUrl = 'seuperfil_1.html';

    if (concluirButton) {
        concluirButton.addEventListener('click', () => {
            const coisas = coisasTextarea ? coisasTextarea.value.trim().split('\n') : [];
            const frase = fraseInput ? fraseInput.value.trim() : '';
            const mood = moodInput ? moodInput.value.trim() : '';

            console.log('--- DADOS ENVIADOS PARA SALVAMENTO ---');
            console.log('Três coisas:', coisas);
            console.log('Frase:', frase);
            console.log('Mood:', mood);
            
            alert('Perfil atualizado'); 

            window.location.href = profilePageUrl;
        });
    }

    if (voltarButton) {
        voltarButton.addEventListener('click', () => {
            console.log('Alterações canceladas');

            window.location.href = profilePageUrl;
        });
    }
});
