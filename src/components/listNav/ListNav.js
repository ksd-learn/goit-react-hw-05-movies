import css from './ListNav.module.css'

export const ListNav = ({ showBtnPrev, showBtnNext, handlBtnPrev,handlBtnNext }) => {
    return (
        <div className={css.listNav}>
            <div className={css.listNavLeft}>
                { showBtnPrev &&
                    <button type='button' onClick={handlBtnPrev}>Prev</button>
                }
                { !showBtnPrev&&showBtnNext &&
                    <button className={css.listNavLeftOff} type='button'>Prev</button>
                }
            </div>
            <div>
                { showBtnNext &&
                    <button type='button' onClick={handlBtnNext}>Next</button>
                }
                { !showBtnNext&&showBtnPrev &&
                    <button className={css.listNavLeftOff} type='button'>Next</button>
                }
            </div>
        </div>
    )
}