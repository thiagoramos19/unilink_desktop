document.addEventListener('DOMContentLoaded', () => {
    const concluirButton = document.querySelector('.button-concluir');
    const voltarButton = document.querySelector('.button-voltar');
    const coisasTextarea = document.getElementById('coisas-que-amo');
    const fraseInput = document.getElementById('frase-sobre-mim');
    const moodInput = document.getElementById('meu-mood');

    const profilePageUrl = 'seuperfil.html';

    if (concluirButton) {
        concluirButton.addEventListener('click', () => {

            const coisas = coisasTextarea 
                ? coisasTextarea.value.trim().split('\n').filter(c => c.trim() !== '') 
                : [];
            const frase = fraseInput ? fraseInput.value.trim() : '';
            const mood = moodInput ? moodInput.value.trim() : '';

            const profileData = {
                coisas: coisas.slice(0, 3), 
                fraseBio: frase,
                moodAtual: mood
            };

            localStorage.setItem('userProfileData', JSON.stringify(profileData));
            
            alert('Perfil atualizado com sucesso!'); 

            window.location.href = profilePageUrl;
        });
    }

    if (voltarButton) {
        voltarButton.addEventListener('click', () => {
            window.location.href = profilePageUrl;
        });
    }

    const loadFormData = () => {
        const savedData = localStorage.getItem('userProfileData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);

                if (data.coisas && coisasTextarea) {
                    coisasTextarea.value = data.coisas.join('\n');
                }
                if (data.fraseBio && fraseInput) {
                    fraseInput.value = data.fraseBio;
                }
                if (data.moodAtual && moodInput) {
                    moodInput.value = data.moodAtual;
                }
            } catch (e) {
                console.error('Erro ao pré-carregar os dados do formulário:', e);
            }
        }
    };
    
    loadFormData();
});
