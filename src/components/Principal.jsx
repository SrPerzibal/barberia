import '../css/Home.css'
import mensaje from "../assets/imgs/correo.png"
import lupa from "../assets/imgs/lupa.png"


export default function Principal() {
    return (
        <>
            <header>
                <div>
                    <img src={mensaje} alt="" />
                </div>
                <div>
                    <img src={lupa} alt="" />
                </div>
            </header>

            <section>
                <h1 className='titulo'>ESPECIALISTAS</h1>
            </section>
        </>
    )
}
