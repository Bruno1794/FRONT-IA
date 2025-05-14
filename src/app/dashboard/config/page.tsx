'use client'
import styles from './config.module.css'
import React from "react";
import {getSettings} from "@/action/settings/get-settings";
import postSettings from "@/action/settings/post-settings";
import Swal from "sweetalert2";

export default function ConfigPage() {
    const [time, setTime] = React.useState("");
    const [cadastro, setCadastro] = React.useState(false);
    const [notificar, setNotificar] = React.useState(false);
    const [padrao, setPadrao] = React.useState(false);
    const [envio, setEnvio] = React.useState(false);
    const [atualiza, setAtualiza] = React.useState(false);
    const [msg, setMsg] = React.useState("");

    const [state, action] = React.useActionState(postSettings, {
        ok: false,
        error: '',
        data: null
    })

    // Função para carregar as configurações na montagem
    React.useEffect(() => {
        async function loadSettings() {
            try {
                const { data } = await getSettings();
                setTime(data.time_cobranca);
                setCadastro(data.cadastro);
                setNotificar(data.notificar);
                setEnvio(data.envio);
                setMsg(data.msg_padrao);
                setPadrao(!!data.msg_padrao);
            } catch (error) {
                console.error("Erro ao obter as configurações:", error);
            }
        }
        loadSettings();
    }, [atualiza]);


    React.useEffect(() => {

        if (state.ok) {
            setAtualiza(false);
            Swal.fire({
                title: "Configurações atualizada",
                icon: "success",
                confirmButtonColor: "#20232A",
                draggable: true
            }).then(() =>    setAtualiza(true));

        }
    }, [state]);

    return (
        <section className='conteiner'>
            <form action={action} className={styles.form}>

                <div className={styles.formGroup}>
                    <input
                        type="time"
                        name="time_cobranca"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        placeholder=" "
                        required={true}
                    />
                    <label>Inicio de cobrança</label>
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="cadastro"
                            checked={cadastro}
                            onChange={(e) =>
                                setCadastro(e.target.checked)
                            }
                        />
                        <span className={styles.customCheckbox}></span>
                        Cadastrar Novos clientes automatico?
                    </label>
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="notificar"
                            checked={notificar}
                            onChange={(e) =>
                                setNotificar(e.target.checked)
                            }
                        />
                        <span className={styles.customCheckbox}></span>
                        Noticar clientes inativos ?
                    </label>
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="envio"
                            checked={envio}
                            onChange={(e) =>
                                setEnvio(e.target.checked)
                            }
                        />
                        <span className={styles.customCheckbox}></span>
                        Enviar fatura automatico ?
                    </label>
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="padrao"
                            checked={padrao}
                            onChange={(e) =>
                                setPadrao(e.target.checked)
                            }
                        />
                        <span className={styles.customCheckbox}></span>
                        Utilizar uma mensagem padrao de cobrança ?
                    </label>
                </div>

                {padrao &&
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            name="msg"
                            value={msg}
                            onChange={e => setMsg(e.target.value)}
                            placeholder=" "
                            required={true}
                        />
                        <label>Msg padrão</label>
                    </div>
                }

                <button className="btnPadrao">Salvar</button>
            </form>


        </section>
    )
}