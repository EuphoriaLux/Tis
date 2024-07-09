document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('clientForm');
    const inputs = document.querySelectorAll('input, select');
    const copyButton = document.getElementById('copyButton');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            generateResponse();
        });
    }

    inputs.forEach(input => {
        input.addEventListener('input', generateResponse);
    });

    if (copyButton) {
        copyButton.addEventListener('click', copyToClipboard);
    }

    function generateResponse() {
        const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
        const clientName = document.getElementById('clientName')?.value || '';
        const groupSize = document.getElementById('groupSize')?.value || '';
        const ship = document.getElementById('ship')?.value || '';
        const departure = document.getElementById('departure')?.value || '';
        const arrival = document.getElementById('arrival')?.value || '';
        const cabinType = document.getElementById('cabinType')?.value || '';
        const price = document.getElementById('price')?.value || '';
        const options = Array.from(document.querySelectorAll('input[name="options"]:checked')).map(opt => opt.value);
        const language = document.getElementById('language')?.value || 'fr';

        const data = {
            gender,
            clientName,
            groupSize,
            ship,
            departure,
            arrival,
            cabinType,
            price,
            options
        };

        const response = getResponseTemplate(language, data);
        const responseElement = document.getElementById('generatedResponse');
        if (responseElement) {
            responseElement.textContent = response;
        }

        // Calculer et afficher le prix total
        const totalPrice = calculateTotalPrice(data);
        const totalPriceElement = document.getElementById('totalPrice');
        if (totalPriceElement) {
            totalPriceElement.textContent = totalPrice.toFixed(2);
        }
    }

    function getResponseTemplate(language, data) {
        const templates = {
            fr: `
    ${data.gender} ${data.clientName},
    
    Suite à votre demande, nous avons vérifié les options disponibles pour ${data.groupSize} personne(s). Voici les détails :
    
    Navire : ${data.ship}
    Départ : ${formatDate(data.departure, 'fr')}
    Arrivée : ${formatDate(data.arrival, 'fr')}
    Type de cabine : ${data.cabinType}
    Prix par personne : ${data.price} €
    ${data.options.length > 0 ? `
    Options incluses :
    ${data.options.map(opt => `- ${opt}`).join('\n')}
    ` : ''}
    Le prix total pour votre séjour est de ${calculateTotalPrice(data).toFixed(2)} €.
    
    Ce prix inclut les taxes portuaires et la TVA.
    
    Nous restons à votre disposition pour toute information complémentaire.
    
    Cordialement,
    L'équipe de réservation`,
            en: `
    Dear ${data.gender === 'Madame' ? 'Mrs.' : 'Mr.'} ${data.clientName},
    
    Following your request, we have checked the options available for ${data.groupSize} person(s). Here are the details:
    
    Ship: ${data.ship}
    Departure: ${formatDate(data.departure, 'en')}
    Arrival: ${formatDate(data.arrival, 'en')}
    Cabin type: ${data.cabinType}
    Price per person: €${data.price}
    ${data.options.length > 0 ? `
    Included options:
    ${data.options.map(opt => `- ${opt}`).join('\n')}
    ` : ''}
    The total price for your stay is €${calculateTotalPrice(data).toFixed(2)}.
    
    This price includes port taxes and VAT.
    
    We remain at your disposal for any further information.
    
    Best regards,
    The booking team`,
            de: `
    Sehr geehrte${data.gender === 'Madame' ? ' Frau' : 'r Herr'} ${data.clientName},
    
    Aufgrund Ihrer Anfrage haben wir die verfügbaren Optionen für ${data.groupSize} Person(en) überprüft. Hier sind die Details:
    
    Schiff: ${data.ship}
    Abfahrt: ${formatDate(data.departure, 'de')}
    Ankunft: ${formatDate(data.arrival, 'de')}
    Kabinentyp: ${data.cabinType}
    Preis pro Person: ${data.price} €
    ${data.options.length > 0 ? `
    Enthaltene Optionen:
    ${data.options.map(opt => `- ${opt}`).join('\n')}
    ` : ''}
    Der Gesamtpreis für Ihren Aufenthalt beträgt ${calculateTotalPrice(data).toFixed(2)} €.
    
    Dieser Preis beinhaltet Hafengebühren und Mehrwertsteuer.
    
    Für weitere Informationen stehen wir Ihnen gerne zur Verfügung.
    
    Mit freundlichen Grüßen,
    Das Buchungsteam`
        };
    
        return templates[language] || templates.fr;
    }
    

    function calculateTotalPrice(data) {
        let total = parseFloat(data.price || 0) * parseInt(data.groupSize || 0);
        total += data.options.length * 50;
        return total;
    }

    function formatDate(dateString, locale) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'de' ? 'de-DE' : 'fr-FR', options);
    }

    function copyToClipboard() {
        const responseElement = document.getElementById('generatedResponse');
        if (responseElement) {
            const responseText = responseElement.textContent;
            navigator.clipboard.writeText(responseText).then(function() {
                alert('Réponse copiée dans le presse-papier !');
            }).catch(function(err) {
                console.error('Erreur lors de la copie : ', err);
                alert('Impossible de copier le texte. Veuillez réessayer.');
            });
        }
    }

});

