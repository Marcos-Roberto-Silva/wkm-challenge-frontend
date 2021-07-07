import format from 'date-fns/format';
import Image from 'next/image';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './styles.module.scss';

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d, MMMM', {
      locale: ptBR,
    });

    return (
        <header className={styles.headerContainer}>
            <Image src="/wkm.png" width={200} height={50} alt="logo-wkm" />
            <p> O melhor para você, sempre</p>
            <span>{currentDate}</span>
        </header>
    );
}