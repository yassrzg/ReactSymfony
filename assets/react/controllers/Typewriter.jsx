import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

function TypewriterEffect() {
    const [text, setText] = useState('');
    const sentences = [
        '<h2><strong style="color: #27ae60;"> Transforme-toi, deviens meilleur !</strong> </h2>!',
        '<h2><strong style="color: #27ae60;"> Régime adopté! Changement garanti !</strong> </h2>!',
        '<h2><strong style="color: #27ae60;"> Votre corps, votre transformation !</strong> </h2>!',
        '<h2><strong style="color: #27ae60;"> Découvrez votre potentiel, transformez-vous !</strong> </h2>!',
    ];

    useEffect(() => {
        let sentenceIndex = 0;
        let charIndex = 0;

        const type = () => {
            if (sentenceIndex === sentences.length) {
                sentenceIndex = 0;
            }

            if (charIndex < sentences[sentenceIndex].length) {
                setText((prevText) => prevText + sentences[sentenceIndex].charAt(charIndex));
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

    return <div className="description" dangerouslySetInnerHTML={{ __html: text }} />;
}

export default TypewriterEffect;