import { Howl } from 'howler';

/**
 * Sound manager for game audio effects
 * In production, replace data URIs with actual audio files
 */

// Placeholder sound effects (in production, use actual audio files)
const sounds = {
    correct: new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSd+zPDThjMHGGS67fCZTgwOUKXh8bllHAU2jdfxxncsBSF1xe/glEIKEVu06OyrWBQJQJve8MVwIAUmecrw1IU1BxlnvO7xmU4MDk6k4PG6aB4FNIzU8cl+MAYcc8nu3I9CDBFYs+jnsFoUCT6Y3O/JdiEFJHfJ8N2SOA=='],
        volume: 0.3,
    }),

    error: new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSd+zPDThjMHGGS67fCZTgwOUKXh8bllHAU2jdfxxncsBSF1xe/glEIKEVu06OyrWBQJQJve8MVwIAUmecrw1IU1BxlnvO7xmU4MDk6k4PG6aB4FNIzU8cl+MAYcc8nu3I9CDBFYs+jnsFoUCT6Y3O/JdiEFJHfJ8N2SOA=='],
        volume: 0.4,
        rate: 0.5,
    }),

    complete: new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSd+zPDThjMHGGS67fCZTgwOUKXh8bllHAU2jdfxxncsBSF1xe/glEIKEVu06OyrWBQJQJve8MVwIAUmecrw1IU1BxlnvO7xmU4MDk6k4PG6aB4FNIzU8cl+MAYcc8nu3I9CDBFYs+jnsFoUCT6Y3O/JdiEFJHfJ8N2SOA=='],
        volume: 0.5,
        rate: 1.2,
    }),

    powerup: new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSd+zPDThjMHGGS67fCZTgwOUKXh8bllHAU2jdfxxncsBSF1xe/glEIKEVu06OyrWBQJQJve8MVwIAUmecrw1IU1BxlnvO7xmU4MDk6k4PG6aB4FNIzU8cl+MAYcc8nu3I9CDBFYs+jnsFoUCT6Y3O/JdiEFJHfJ8N2SOA=='],
        volume: 0.4,
        rate: 1.5,
    }),
};

export const soundManager = {
    /**
     * Play correct placement sound
     */
    playCorrect: () => {
        sounds.correct.play();
    },

    /**
     * Play error sound
     */
    playError: () => {
        sounds.error.play();
    },

    /**
     * Play puzzle completion sound
     */
    playComplete: () => {
        sounds.complete.play();
    },

    /**
     * Play power-up activation sound
     */
    playPowerUp: () => {
        sounds.powerup.play();
    },

    /**
     * Set global volume
     */
    setVolume: (volume: number) => {
        Object.values(sounds).forEach(sound => {
            sound.volume(volume);
        });
    },

    /**
     * Mute all sounds
     */
    mute: () => {
        Howler.mute(true);
    },

    /**
     * Unmute all sounds
     */
    unmute: () => {
        Howler.mute(false);
    },
};

export default soundManager;
