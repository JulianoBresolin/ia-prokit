import Image from "next/image";
import Link from "next/link";


export default function Contato() {
    return (
        <>
            <section className="  px-10 max-w-[90%] sm:max-w-[83%] pt-20 mb-20 text-white ">
                <h1 id="titulo-Contato" className=" text-center text-2xl font-bold mb-10  ">Contato</h1>
                <div className="flex flex-wrap justify-center  items-center gap-52  m-5 ">
                  

                    <div className="w-[500px]   text-lg ">
                        <form className="mb-10 " action="https://formsubmit.co/julianobresolin.7@gmail.com" method="POST">
                            <input type="hidden" name="_subject" value="Novo envio!" />
                            <label htmlFor="nome"><p> Nome:</p></label>
                            <input type="text" name="name" id="nome" placeholder="Seu Nome" required />
                            <br></br>
                            <label htmlFor="email"><p> email:</p></label>
                            <input type="email" name="email" id="email" placeholder="email@email.com" required />
                            <br></br>
                            <label htmlFor="tel"><p> Telefone:</p></label>
                            <input type="tel" name="tel" id="tel" placeholder="41 9999-9999" />
                            <br></br>
                            <label htmlFor="assunto"><p> Assunto:</p></label>
                            <input type="assunto" name="subject" id="assunto" placeholder="Orçamento" />
                            <br></br>
                            <label htmlFor="Mensagem"><p> Mensagem:</p></label>
                            <textarea name="message" id="Mensagem" placeholder="ex:Gostaria de um orçamento para um Projeto." cols="15" rows="10"></textarea>
                            <br></br>
                            <div className=" flex flex-col justify-center items-center gap-2 md:flex-row">
                           
                                <button className="bntSecundaryLimp" type="reset" id="limpar" name="limpar">
                                    <p>Limpar</p>
                                </button>
                                <button className="bntPrimaryEnv" type="submit" id="enviar" name="enviar">
                                    <p>Enviar</p>
                                </button>
                               
                            </div>
                            <input type="hidden" name="_next" value="/" />
                            <input type="hidden" name="_template" value="box" />
                        </form>

<div className=" flex flex-col sm:flex-row justify-between items-center pt-10 gap-2">
   
<Image
                                        src="/qr-code.png"
                                        alt="qr"
                                        width={151}
                                        height={151}
                                        quality={100}
                                        className="w-[150px] h-[150px]"
                                    />
                                   
                                   
                        <ul className="flex flex-col  gap-2 m-5 ">

                            <li className=" ">

                                <Link className="flex items-center  gap-2 " href="http://wa.me/5541997034014" target="_blank" >
                                    <Image
                                        src="/phone-icon.svg"
                                        alt="wts"
                                        width={23}
                                        height={23}
                                        quality={90}
                                        className="pr-1 w-[23px] h-[23px] "
                                    />

                                    <p className=" text-base">+55 (41) 99703-4014</p>
                                </Link>
                            </li>


                            <li className="li-contato">

                                <Link className="flex items-center  gap-2 " href="mailto:julianobresolin.7@gmail.com" target="_blank"><Image
                                    src="/email-icon.svg"
                                    alt="email"
                                    width={23}
                                    height={23}
                                    quality={90}
                                    className="pr-1 w-[23px] h-[23px]"
                                />
                                    <p className=" text-base">julianobresolin.7@gmail.com</p>
                                </Link>
                            </li>
                            <li className="li-contato">

<a className="flex items-center gap-2 " download href="/juliano_bresolin.vcf"><Image
    src="/vcardicon.svg"
    alt="vccard"
    width={23}
    height={23}
    quality={90}
    className="w-[23px] h-[23px]"
/>
    <p className=" text-base">Baixar vcard para adicionar aos seus contatos</p>
    
</a>

</li>
                        </ul>
                        </div>
                    
                    </div>
                 
                </div>


            </section>
        </>
    );
}