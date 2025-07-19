import '../css/Home.css'
import { useState } from "react";
import { supabase } from "../supabaseClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';

import foto1 from "../assets/imgs/foto1.png"
import foto2 from "../assets/imgs/foto2.png"
import foto3 from "../assets/imgs/foto3.png"



function Home({ userName }) {

    const [step, setStep] = useState(1);

    const [servicio, setServicio] = useState("");
    const [fecha, setFecha] = useState(null);
    const [hora, setHora] = useState("");
    const [mensaje, setMensaje] = useState("");



    const horasDisponibles = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

    const guardarCita = () => {
        supabase
            .from("citas")
            .insert([
                {
                    servicio,
                    fecha: fecha.toISOString().split("T")[0],
                    hora,
                    cliente: userName

                },
            ])
            .then(({ error }) => {
                if (error) {
                    setMensaje("Error al guardar. Intenta con otra hora.");
                } else {
                    setMensaje("¡Cita guardada exitosamente!");
                    setStep(1);
                    setServicio("");
                    setFecha(null);
                    setHora("");
                }
            });
    };

    // onclick (() => setServicio = 'manicura')

    return (
        <div className="agenda-container">

            {step === 1 && (
                <>
                    <h2 className="agenda-titulo">ESPECIALISTAS</h2>
                    <div className="agenda-paso">
                        <p className="agenda-label">💅Escoge un servicio:</p>
                        <div className='agenda-servicio'>
                            <div className='agenda-text'>
                                <h3>Makeup</h3>
                                <p>Anna Leonchart</p>
                                <button className={servicio === 'Makeup' ? 'btn-active' : ''} onClick={() => setServicio('Makeup')}>From $20</button>
                            </div>
                            <div>
                                <img src={foto1} alt="" />
                            </div>
                        </div>
                        <div className='agenda-servicio'>
                            <div>
                                <img src={foto2} alt="" />
                            </div>
                            <div className='agenda-text'>
                                <h3>Skincare</h3>
                                <p>Mia Lissa</p>
                                <button className={servicio === 'Skincare' ? 'btn-active' : ''} onClick={() => setServicio('Skincare')}>From $50</button>
                            </div>
                        </div>
                        <div className='agenda-servicio'>
                            <div className='agenda-text'>
                                <h3>Hairstyle</h3>
                                <p>Eren Akerman</p>
                                <button className={servicio === 'Hairstyle' ? 'btn-active' : ''} onClick={() => setServicio('Hairstyle')}>From $20</button>
                            </div>
                            <div>
                                <img src={foto3} alt="" />
                            </div>
                        </div>

                        <button className="agenda-boton" disabled={!servicio} onClick={() => setStep(2)}>
                            Siguiente
                        </button>
                    </div>
                </>
            )}

            {step === 2 && (
                <div className="agenda-paso">
                    <p className="agenda-titulo">📅Escoge el día del mes:</p>
                    <DatePicker
                        selected={fecha}
                        onChange={(date) => setFecha(date)}
                        inline
                        locale={es}
                        calendarClassName="estilo-calendario"

                    />
                    <br />
                    <button className="agenda-boton" disabled={!fecha} onClick={() => setStep(3)}>
                        Siguiente
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="agenda-paso">
                    <p className="agenda-label">⏰ Escoge la hora:</p>
                    <div className="agenda-horas">
                        {horasDisponibles.map((h) => (
                            <button
                                key={h}
                                className={`hora-boton ${hora === h ? 'hora-seleccionada' : ''}`}
                                onClick={() => setHora(h)}
                            >
                                {h}
                            </button>
                        ))}
                    </div>
                    <button className="agenda-boton" disabled={!hora} onClick={guardarCita}>
                        Confirmar cita
                    </button>
                </div>
            )}

            {mensaje && <p className="agenda-mensaje">{mensaje}</p>}
        </div>
    );
}

export default Home