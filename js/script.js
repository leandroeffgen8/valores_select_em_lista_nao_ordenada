const selects = document.querySelectorAll('.grid-select select');
const elDiv = document.querySelector('.grid-list');

window.addEventListener('DOMContentLoaded', () => {
    selects.forEach( select => {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Selecione uma opção';
        option.setAttribute('selected', true);
        select.insertBefore(option, select.firstChild);
    });
});

selects.forEach((select, index) => {
    const type = select.dataset.type;
    const div = document.createElement('div');
    div.classList.add('items');
    div.setAttribute('data-item', `item-${index + 1}`)
    const elTitle = document.createElement('h3');
    elTitle.classList.add('label');
    const strong = document.createElement('strong');

    div.appendChild(elTitle);

    for( let i = 0; i < select.options.length; i++ ){
        const option = select.options[i];
        const value = option.value;
        const text = option.textContent;

        const li = document.createElement('span');
        li.textContent = text;
        div.appendChild(li);
    }

    let vogal;
    vogal = type == 'cor' ? 'a' : 'o';
    elTitle.textContent = `Selecione ${vogal} ${type}: `;
    elTitle.appendChild(strong); 
    elDiv.appendChild(div);
});

const button = document.createElement('button');
button.setAttribute('id', 'selecionar');
button.textContent = 'Selecionar';
elDiv.appendChild(button);

const spans = document.querySelectorAll('span');

spans.forEach(span => {
    span.addEventListener('click', (e) => {
        const text = e.target;
        let value = text.textContent
        let div = text.parentNode;
        let strong = div.querySelector('strong');
        strong.textContent = value;

        if( value !== '' ){
            strong.classList.add('active');
        } 

        active(e);        
       
        const el = e.target.parentNode;
        const itemLista = el.getAttribute('data-item');        
        
        selects.forEach( select => {
            const item = select.parentNode;
            const itemSelect = item.getAttribute('data-item');

            if( itemLista == itemSelect ){

                for( let i = 0; i < select.options.length; i++ ){
                    select.options[i].removeAttribute('selected');
                }

                var selectedOption = document.querySelector(`option[value="${value}"]`);                
                selectedOption.setAttribute('selected', 'selected');

                let elButton = elDiv.querySelector('#selecionar');
                elButton.addEventListener('click', buttonSelected);

            }
            
        });        
    
    });
});

const buttonSelected = (e) => {
    const spans = document.querySelectorAll('span');
    let items = [];

    spans.forEach( span => {
        if( span.classList.contains('active') ){
            const text = span.textContent;
            items.push(text);
        }
    });
   
    console.log(items);
}

const active = (e) => {
    const element = e.target.parentNode;
    const spans = element.querySelectorAll('span');
    
    spans.forEach(span => {
        span.classList.remove('active');
    });
    
    e.target.classList.add('active');
}