import styles from "../content.module.css";

const ContentSection = ({ forecastData }, { handleClick }) => {
  console.log(forecastData);
  return (
    <div className={styles.preto}>
      <div>
        <p className={styles.teste} data-icon={forecastData.icon}></p>
      </div>
      <div
        className={`${styles.forecastContainer__list} ${styles.forecastContainer__content}`}
      >
        HOJE
        <p
          className={`${styles.forecastContainer__temp} ${styles.forecastContainer__changeIcon}`}
          onClick={handleClick}
        >
          {forecastData.temp}
        </p>
        <p>{forecastData.description}</p>
        {forecastData.wind &&
          forecastData.pressure &&
          forecastData.humidity && (
            <ul>
              <li>Vento: {forecastData.wind}</li>
              <li>Pressão: {forecastData.pressure}</li>
              <li>Humidade: {forecastData.humidity}</li>
            </ul>
          )}
      </div>
    </div>
  );
};

export default ContentSection;
