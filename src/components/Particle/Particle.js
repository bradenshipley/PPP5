import React, { PureComponent } from 'react'
import Particles from 'react-particles-js'

class Particle extends PureComponent {
    render() {
        return (
            <Particles
                params={{
                    particles: {
                        reload: {
                            enable: false
                        },
                        number: {
                            value: 300,
                            density: {
                                enable: true
                            }
                        },
                        size: {
                            value: 4,
                            random: true,
                            anim: {
                                speed: 4,
                                size_min: 0.3
                            }
                        },
                        line_linked: {
                            enable: false
                        },
                        move: {
                            random: true,
                            speed: 2,
                            direction: 'top',
                            out_mode: 'out'
                        }
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: false,
                                mode: 'bubble'
                            },
                            onclick: {
                                enable: true,
                                mode: 'repulse'
                            }
                        },
                        modes: {
                            bubble: {
                                distance: 250,
                                duration: 2,
                                size: 0,
                                opacity: 0
                            },
                            repulse: {
                                distance: 400,
                                duration: 4
                            }
                        }
                    }
                }}
            />
        )
    }
}

export default Particle
