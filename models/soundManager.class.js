/**
 * Manages all game sounds, including background music, effects, and character actions.
 */
class SoundManager {
    /**
     * Initializes all sounds and sets default enabled state.
     */
    constructor() {
        this.enabled = true;
        this.background = this.create('assets/sounds/underwater-loop-amb.wav', true);
        this.coin = this.create('assets/sounds/coin-257878.mp3');
        this.hurt = this.create('assets/sounds/character_hurt.wav');
        this.enemy = this.create('assets/sounds/enemy_blownAway.wav');
        this.heart = this.create('assets/sounds/hearth_pickUp.wav');
        this.poison = this.create('assets/sounds/poison_pickUp.mp3');
        this.bossIntro = this.create('assets/sounds/boss_appearing.wav');
        this.bossHit = this.create('assets/sounds/enemy_hit.mp3');
        this.win = this.create('assets/sounds/win.mp3');
        this.lose = this.create('assets/sounds/game_over.mp3');
        this.tailHit = this.create('assets/sounds/whip-02-242215.mp3', false, true);
        this.bubblePop = this.create('assets/sounds/bubble-pop-06-351337.mp3', false, true);
        this.bubbleError = this.create('assets/sounds/error-010-206498.mp3', false, true);
         this.loadSoundState();
    }

    /**
    * Loads the saved sound state from localStorage and applies it.
    * @returns {void}
    */
    loadSoundState() {
        const savedSound = localStorage.getItem('soundEnabled');
        if (savedSound !== null) {
            this.enabled = savedSound === 'true';
            this.muteAll(!this.enabled); 
        }
    }

    /**
    * Mutes or unmutes all Audio instances stored in this object.
    * @param {boolean} mute - True to mute all audio, false to unmute.
    * @returns {void}
    */
    muteAll(mute) {
        Object.values(this).forEach(s => {
            if (s instanceof Audio) {
                s.muted = mute;
            }
        });
    }

    /**
     * Creates an Audio object.
     * @param {string} src - Path to the audio file
     * @param {boolean} [loop=false] - Whether the audio should loop
     * @param {boolean} [singleInstance=false] - If true, always use the same instance instead of cloning
     * @returns {HTMLAudioElement} The audio element
     */
    create(src, loop = false, singleInstance = false) {
        const audio = new Audio(src);
        audio.loop = loop;
        audio.singleInstance = singleInstance; 
        return audio;
    }

    /**
     * Plays a sound.
     * @param {HTMLAudioElement} sound - The audio element to play
     */
    play(sound) {
        if (!this.enabled || !sound) return;
        if (sound.singleInstance) {
            sound.currentTime = 0;
            sound.play();
        } else if (!sound.loop) {
            const s = new Audio(sound.src);
            s.play();
        } else {
            sound.currentTime = 0;
            sound.play();
        }
    }

    /**
     * Toggles sound on or off and mutes/unmutes all audio elements.
     */
    toggle() {
        this.enabled = !this.enabled;
        this.muteAll(!this.enabled);
        localStorage.setItem('soundEnabled', this.enabled);
    }

}