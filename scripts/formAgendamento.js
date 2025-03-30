document.addEventListener('DOMContentLoaded', function() {
    const especialidadeSelect = document.getElementById('especialidade');
    const profissionalSelect = document.getElementById('profissional');
    const horarioSelect = document.getElementById('horario');
    const dataBtns = document.querySelectorAll('.data-btn');
    const confirmacaoInfo = document.querySelector('.confirmacao-info');

    let selectedDate = null;

    dataBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            dataBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedDate = this.textContent;
            updateConfirmation();
        });
    });

    [especialidadeSelect, profissionalSelect, horarioSelect].forEach(select => {
        select.addEventListener('change', updateConfirmation);
    });

    function formatTime(time) {
        return time.replace(/(\d{2})(\d{2})/, '$1:$2');
    }

    function updateConfirmation() {
        const especialidade = especialidadeSelect.value;
        const profissional = profissionalSelect.options[profissionalSelect.selectedIndex].text.trim();
        const horario = formatTime(horarioSelect.value);

        if (especialidade && profissional && selectedDate && horario) {
            confirmacaoInfo.innerHTML = `
                <p>Especialidade: ${especialidade}</p>
                <p>Profissional: ${profissional}</p>
                <p>Data: ${selectedDate}</p>
                <p>Horário: ${horario}</p>
            `;
        }
    }

    document.querySelector('.confirmar-btn').addEventListener('click', function() {
        if (!especialidadeSelect.value || !profissionalSelect.value || !selectedDate || !horarioSelect.value) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Save appointment data to localStorage
        const appointmentData = {
            especialidade: especialidadeSelect.value,
            profissional: profissionalSelect.options[profissionalSelect.selectedIndex].text,
            data: selectedDate,
            horario: formatTime(horarioSelect.value)
        };
        localStorage.setItem('lastAppointment', JSON.stringify(appointmentData));

        // Redirect to agenda page
        window.location.href = '/pages/agenda.html';
    });
});