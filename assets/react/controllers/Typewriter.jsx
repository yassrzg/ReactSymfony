import React, { useEffect, useState } from 'react';

function TypewriterEffect() {
    const [text, setText] = useState('');
    const sentences = [
        'Transforme-toi, Deviens meilleur !',
        'Régime adopté ! Changement garanti !',
        'Votre corps, Votre transformation !',
        'Découvrez votre potentiel, Transformez-vous !',
    ];

    useEffect(() => {
        let sentenceIndex = 0;
        let charIndex = 0;

        const type = () => {
            if (sentenceIndex === sentences.length) {
                sentenceIndex = 0;
            }

            if (charIndex < sentences[sentenceIndex].length) {
                const nextChar = sentences[sentenceIndex].substring(charIndex, charIndex + 1);
                setText((prevText) => prevText + nextChar);
                charIndex++;
                setTimeout(type, 50);
            } else {
                setTimeout(erase, 3000);
            }
        };

        const erase = () => {
            if (charIndex > 0) {
                setText((prevText) => prevText.slice(0, -1));
                charIndex--;
                setTimeout(erase, 20);
            } else {
                sentenceIndex++;
                setTimeout(type, 500);
            }
        };

        setTimeout(type, 2000);

        return () => {
            clearTimeout();
        };
    }, []);

    return (<h2 className="description" dangerouslySetInnerHTML={{ __html: text }}></h2>);
}

export default TypewriterEffect;
