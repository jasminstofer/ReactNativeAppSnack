import './TrafficLight.css';
import Light from "./Light";

import { useState } from "react";

const TrafficLight = ({ useTimer }) => {
    const [state, setState] = useState(0);
    const [illuminatedLights, setIlluminatedLights] = useState([true, false, false]);

    if (useTimer) {
        setInterval(() => {
            nextStep();
        }, 1000);
    }

    function nextStep() {
        const nextState = (state + 1) % 4;

        switch (nextState) {
            case 0:
                setIlluminatedLights([true, false, false]);
                break;
            case 1:
                setIlluminatedLights([true, true, false]);
                break;
            case 2:
                setIlluminatedLights([false, false, true]);
                break;
            case 3:
                setIlluminatedLights([false, true, true]);
                break;
            default:
                setIlluminatedLights([true, false, false]);
                break;
        }

        setState(nextState);
    }

    return (
    <>
        <div className="traffic-light" onClick={ !useTimer ? nextStep : null }>
            <Light color="red" active={illuminatedLights[0]} />
            <Light color="yellow" active={illuminatedLights[1]} />
            <Light color="green" active={illuminatedLights[2]} />
        </div>
    </>)
}

export default TrafficLight;