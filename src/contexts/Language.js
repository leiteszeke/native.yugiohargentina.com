// Dependencies
import React from 'react';
// Services
import * as LanguagesService from '#services/languages';

const LanguageContext = React.createContext(null);

const LanguageProvider = React.memo(({ children }) => {
  const [languages, setLanguages] = React.useState(null);

  const fetchLanguages = () => LanguagesService.all().then(res => setLanguages(res.data));
  const getById = id => languages.find(f => f.id === id);

  React.useEffect(() => {
    fetchLanguages();
  }, [])

  return (
    <LanguageContext.Provider value={{ getById, languages }}>
      {children}
    </LanguageContext.Provider>
  )
});

const useLanguage = () => {
  const { getById, languages } = React.useContext(LanguageContext)
  return { getById, languages }
}

export { LanguageProvider, useLanguage };