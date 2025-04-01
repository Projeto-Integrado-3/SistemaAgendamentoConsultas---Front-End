document.addEventListener('DOMContentLoaded', function () {
    const pacienteInput = document.getElementById('paciente');
    const especialidadeSelect = document.getElementById('especialidade');
    const profissionalSelect = document.getElementById('profissional');
    const horarioSelect = document.getElementById('horario');
    const dataBtns = document.querySelectorAll('.data-btn');
    const confirmacaoInfo = document.querySelector('.confirmacao-info');

    let selectedDate = null;

    dataBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            dataBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            const year = new Date().getFullYear();
selectedDate = `${this.textContent}/${year}`;
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
        const paciente = pacienteInput.value;
        const especialidade = especialidadeSelect.value;
        const profissional = profissionalSelect.options[profissionalSelect.selectedIndex].text.trim();
        const horario = formatTime(horarioSelect.value);

        if (paciente && especialidade && profissional && selectedDate && horario) {
            confirmacaoInfo.innerHTML = `
                <p>Paciente: ${paciente}</p>
                <p>Especialidade: ${especialidade}</p>
                <p>Profissional: ${profissional}</p>
                <p>Data: ${selectedDate}</p>
                <p>Horário: ${horario}</p>
            `;
        }
    }

    document.querySelector('.confirmar-btn').addEventListener('click', function () {
        if (!especialidadeSelect.value || !profissionalSelect.value || !selectedDate || !horarioSelect.value) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Por favor, preencha todos os campos.',
            });
            return;
        }

       
        const appointmentData = {
            paciente: pacienteInput.value,
            idade: document.getElementById('idade').value,
            especialidade: especialidadeSelect.value,
            profissional: profissionalSelect.options[profissionalSelect.selectedIndex].text,
            data: selectedDate,
            horario: formatTime(horarioSelect.value)
        };

       
        const appointments = JSON.parse(localStorage.getItem('appointments')) ?? [];

       
        appointments.push(appointmentData);

       
        localStorage.setItem('appointments', JSON.stringify(appointments));

      
        Swal.fire({
            icon: 'success',
            title: 'Agendamento Confirmado!',
            text: 'O agendamento foi salvo com sucesso.',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            
            window.location.href = '/pages/agenda.html';
        });
    });
});