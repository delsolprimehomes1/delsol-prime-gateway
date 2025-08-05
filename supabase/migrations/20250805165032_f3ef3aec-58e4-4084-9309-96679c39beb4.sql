-- Complete FAQ Translation for German, Polish, Danish, and Swedish
-- Adding remaining FAQs and handling existing category conflicts

-- First, let's add the remaining FAQs for each language (avoiding conflicts)
INSERT INTO public.faqs (language, question, answer_short, answer_long, slug, category, tags, keywords, voice_queries, target_areas, property_types, meta_title, meta_description, is_featured, sort_order) VALUES

-- German FAQ Translations (de) - Adding more comprehensive content
('de', 'Wie lange dauert der Immobilienkaufprozess in Spanien?', 'Der Immobilienkaufprozess in Spanien dauert normalerweise 8-12 Wochen ab der Angebotannahme.', 'Der vollständige Immobilienkaufprozess in Spanien umfasst mehrere Phasen: Angebotannahme (1-2 Wochen), Reservierungsvertrag und Anzahlung (1 Woche), Due Diligence und Rechtsprüfung (3-4 Wochen), Hypothekantragsbearbeitung falls erforderlich (4-6 Wochen), und abschließende notarielle Beurkundung (1-2 Wochen). DelSolPrimeHomes begleitet Sie durch jeden Schritt und sorgt für einen reibungslosen Ablauf mit deutschen Ansprechpartnern.', 'wie-lange-dauert-immobilienkauf-spanien-de', 'buying-process', ARRAY['Zeitrahmen', 'Kaufprozess', 'Spanien'], ARRAY['Immobilienkauf', 'Zeitrahmen', 'Spanien', 'Prozess'], ARRAY['Wie lange dauert es, eine Immobilie in Spanien zu kaufen', 'Zeitrahmen für Immobilienkauf Spanien'], ARRAY['Costa del Sol', 'Marbella', 'Estepona'], ARRAY['Villa', 'Apartment', 'Townhouse'], 'Immobilienkauf Spanien: Zeitrahmen und Prozess | DelSolPrimeHomes', 'Erfahren Sie, wie lange der Immobilienkaufprozess in Spanien dauert. Kompletter Guide mit Zeitrahmen für jeden Schritt des Kaufprozesses.', false, 20),

('de', 'Welche Steuern fallen beim Immobilienkauf in Spanien an?', 'Die Hauptsteuern sind ITP (6-10%), Notar- und Registergebühren (1-2%) und eventuelle Hypothekensteuern.', 'Beim Immobilienkauf in Spanien fallen verschiedene Steuern und Gebühren an: Übertragungssteuer (ITP) von 6-10% je nach Autonomer Gemeinschaft, Notar- und Grundbuchgebühren (1-2% des Kaufpreises), Anwaltskosten (1-1.5%), Hypothekensteuern falls zutreffend (0.5-1%), und eventuelle Mehrwertsteuer (10%) bei Neubauten. DelSolPrimeHomes erstellt transparente Kostenschätzungen und erklärt alle Gebühren im Detail.', 'welche-steuern-immobilienkauf-spanien-de', 'buying-process', ARRAY['Steuern', 'Kosten', 'Immobilienkauf'], ARRAY['Steuern', 'ITP', 'Übertragungssteuer', 'Kosten'], ARRAY['Welche Steuern muss ich beim Immobilienkauf in Spanien zahlen', 'Kosten für Immobilienkauf Spanien'], ARRAY['Costa del Sol', 'Andalusien'], ARRAY['Alle Immobilientypen'], 'Steuern beim Immobilienkauf in Spanien | Kompletter Guide', 'Vollständiger Überblick über alle Steuern und Gebühren beim Immobilienkauf in Spanien. ITP, Notargebühren und weitere Kosten erklärt.', true, 21),

('de', 'Kann ich als Nicht-EU-Bürger Immobilien in Spanien kaufen?', 'Ja, Nicht-EU-Bürger können problemlos Immobilien in Spanien erwerben mit denselben Rechten wie EU-Bürger.', 'Nicht-EU-Bürger haben die gleichen Immobilienerwerbsrechte in Spanien wie EU-Bürger. Sie benötigen lediglich eine NIE-Nummer (Número de Identificación de Extranjero) und können ohne Einschränkungen kaufen, verkaufen und vermieten. DelSolPrimeHomes unterstützt internationale Käufer bei der NIE-Beantragung, Bankkonten-Eröffnung und allen rechtlichen Aspekten des Kaufprozesses mit mehrsprachigem Service.', 'nicht-eu-buerger-immobilien-spanien-kaufen-de', 'buying-process', ARRAY['Nicht-EU-Bürger', 'Rechtliches', 'Internationale Käufer'], ARRAY['Nicht-EU', 'Ausländer', 'Immobilienkauf', 'Rechte'], ARRAY['Können Nicht-EU-Bürger Immobilien in Spanien kaufen', 'Immobilienrechte für Ausländer Spanien'], ARRAY['Costa del Sol'], ARRAY['Alle Immobilientypen'], 'Nicht-EU-Bürger Immobilienkauf Spanien | Rechte und Verfahren', 'Alles was Nicht-EU-Bürger über den Immobilienkauf in Spanien wissen müssen. Rechte, NIE-Nummer und rechtliche Aspekte erklärt.', true, 22),

('de', 'Was ist eine NIE-Nummer und wie bekomme ich sie?', 'Die NIE ist eine Steuernummer für Ausländer, die für alle Immobilientransaktionen in Spanien erforderlich ist.', 'Die NIE (Número de Identificación de Extranjero) ist eine spanische Steuernummer für Ausländer, die für alle offiziellen Transaktionen erforderlich ist. Sie können sie beim spanischen Konsulat in Ihrem Heimatland oder direkt in Spanien bei der Policia Nacional beantragen. Benötigte Unterlagen: Reisepass, ausgefülltes Formular EX-15, Nachweis des Grundes (z.B. Immobilienkaufabsicht). DelSolPrimeHomes organisiert NIE-Termine, begleitet Sie zum Termin und übersetzt alle Dokumente.', 'nie-nummer-beantragen-spanien-de', 'legal-aspects', ARRAY['NIE', 'Steuernummer', 'Beantragung'], ARRAY['NIE', 'Steuernummer', 'Ausländer', 'Beantragung'], ARRAY['Wie bekomme ich eine NIE-Nummer in Spanien', 'NIE-Nummer beantragen für Immobilienkauf'], ARRAY['Costa del Sol', 'Marbella'], ARRAY['Alle Immobilientypen'], 'NIE-Nummer beantragen Spanien | Kompletter Guide für Immobilienkäufer', 'Erfahren Sie, wie Sie eine NIE-Nummer für den Immobilienkauf in Spanien beantragen. Schritt-für-Schritt Anleitung und Dokumentenanforderungen.', true, 23),

('de', 'Wie entwickeln sich die Immobilienpreise an der Costa del Sol?', 'Die Immobilienpreise an der Costa del Sol zeigen einen stabilen Aufwärtstrend mit 3-7% jährlichem Wachstum.', 'Der Immobilienmarkt an der Costa del Sol verzeichnet kontinuierliches Wachstum. Faktoren: internationale Nachfrage, begrenzte Küstenflächen, Infrastrukturinvestitionen, und Spaniens Attraktivität für Residenten. Besonders Marbella, Estepona und Benahavís zeigen starke Wertsteigerungen. Luxusimmobilien in Erstlinie zum Meer haben seit 2020 um durchschnittlich 25% zugelegt. DelSolPrimeHomes erstellt individuelle Marktanalysen und ROI-Prognosen für Ihre Investition.', 'immobilienpreise-costa-del-sol-entwicklung-de', 'market-trends', ARRAY['Markttrends', 'Preise', 'Investment'], ARRAY['Preise', 'Markt', 'Trends', 'Costa del Sol'], ARRAY['Wie entwickeln sich die Immobilienpreise Costa del Sol', 'Immobilienmarkt Costa del Sol Prognose'], ARRAY['Costa del Sol', 'Marbella', 'Estepona'], ARRAY['Villa', 'Apartment', 'Penthouse'], 'Immobilienpreise Costa del Sol | Markttrends und Prognosen 2024', 'Aktuelle Entwicklung der Immobilienpreise an der Costa del Sol. Marktanalyse, Trends und Investmentprognosen für 2024 und darüber hinaus.', true, 24),

-- Polish FAQ Translations (pl)
('pl', 'Ile czasu trwa proces zakupu nieruchomości w Hiszpanii?', 'Proces zakupu nieruchomości w Hiszpanii zazwyczaj trwa 8-12 tygodni od zaakceptowania oferty.', 'Kompletny proces zakupu nieruchomości w Hiszpanii obejmuje kilka etapów: akceptacja oferty (1-2 tygodnie), umowa rezerwacyjna i zaliczka (1 tydzień), due diligence i kontrola prawna (3-4 tygodnie), przetwarzanie wniosku kredytowego jeśli potrzebne (4-6 tygodni), i finalne podpisanie u notariusza (1-2 tygodnie). DelSolPrimeHomes przeprowadzi Cię przez każdy krok z polskojęzycznym wsparciem na każdym etapie procesu.', 'ile-czasu-proces-zakup-nieruchomosci-hiszpania-pl', 'buying-process', ARRAY['Czas trwania', 'Proces zakupu', 'Hiszpania'], ARRAY['Zakup nieruchomości', 'Czas', 'Hiszpania', 'Proces'], ARRAY['Ile czasu trwa zakup nieruchomości w Hiszpanii', 'Czas procesu zakupu nieruchomości Hiszpania'], ARRAY['Costa del Sol', 'Marbella', 'Estepona'], ARRAY['Villa', 'Apartament', 'Townhouse'], 'Zakup Nieruchomości Hiszpania: Czas i Proces | DelSolPrimeHomes', 'Dowiedz się, ile czasu trwa proces zakupu nieruchomości w Hiszpanii. Kompletny przewodnik z harmonogramem dla każdego kroku procesu.', false, 25),

('pl', 'Jakie podatki obowiązują przy zakupie nieruchomości w Hiszpanii?', 'Główne podatki to ITP (6-10%), opłaty notarialne i rejestracyjne (1-2%) oraz ewentualne podatki hipoteczne.', 'Przy zakupie nieruchomości w Hiszpanii obowiązują różne podatki i opłaty: podatek od przeniesienia własności (ITP) 6-10% w zależności od wspólnoty autonomicznej, opłaty notarialne i księgi wieczystej (1-2% ceny zakupu), koszty prawne (1-1.5%), podatki hipoteczne jeśli dotyczy (0.5-1%), i ewentualny VAT (10%) przy nowych budowach. DelSolPrimeHomes przygotowuje transparentne wyceny kosztów i pomaga w planowaniu budżetu z dokładnymi kalkulacjami.', 'jakie-podatki-zakup-nieruchomosci-hiszpania-pl', 'buying-process', ARRAY['Podatki', 'Koszty', 'Zakup nieruchomości'], ARRAY['Podatki', 'ITP', 'Podatek transferowy', 'Koszty'], ARRAY['Jakie podatki przy zakupie nieruchomości w Hiszpanii', 'Koszty zakupu nieruchomości Hiszpania'], ARRAY['Costa del Sol', 'Andaluzja'], ARRAY['Wszystkie typy nieruchomości'], 'Podatki przy Zakupie Nieruchomości w Hiszpanii | Kompletny Przewodnik', 'Pełny przegląd wszystkich podatków i opłat przy zakupie nieruchomości w Hiszpanii. ITP, opłaty notarialne i inne koszty wyjaśnione.', true, 26),

-- Danish FAQ Translations (dk)  
('dk', 'Hvor lang tid tager ejendomskøbsprocessen i Spanien?', 'Ejendomskøbsprocessen i Spanien tager normalt 8-12 uger fra tilbudets accept.', 'Den komplette ejendomskøbsprocess i Spanien omfatter flere faser: tilbudsaccept (1-2 uger), reservationskontrakt og depositum (1 uge), due diligence og juridisk kontrol (3-4 uger), behandling af låneansøgning hvis nødvendigt (4-6 uger), og endelig notariel underskrivelse (1-2 uger). DelSolPrimeHomes guider dig gennem hvert trin med dansktalende eksperter, der sikrer en problemfri proces fra start til slut.', 'hvor-lang-tid-ejendomskob-proces-spanien-dk', 'buying-process', ARRAY['Tidsramme', 'Købsprocess', 'Spanien'], ARRAY['Ejendomskøb', 'Tidsramme', 'Spanien', 'Process'], ARRAY['Hvor lang tid tager det at købe ejendom i Spanien', 'Tidsramme for ejendomskøb Spanien'], ARRAY['Costa del Sol', 'Marbella', 'Estepona'], ARRAY['Villa', 'Lejlighed', 'Townhouse'], 'Ejendomskøb Spanien: Tidsramme og Process | DelSolPrimeHomes', 'Lær, hvor lang tid ejendomskøbsprocessen i Spanien tager. Komplet guide med tidsramme for hvert trin af købsprocessen.', false, 27),

-- Swedish FAQ Translations (se)
('se', 'Hur lång tid tar fastighetsköpsprocessen i Spanien?', 'Fastighetsköpsprocessen i Spanien tar normalt 8-12 veckor från budacceptans.', 'Den kompletta fastighetsköpsprocessen i Spanien omfattar flera faser: budacceptans (1-2 veckor), reservationskontrakt och handpenning (1 vecka), due diligence och juridisk kontroll (3-4 veckor), behandling av låneansökan om nödvändigt (4-6 veckor), och slutlig notariell underteckning (1-2 veckor). DelSolPrimeHomes guidar dig genom varje steg med svensktalande experter som säkerställer en smidig process från början till slut.', 'hur-lang-tid-fastighetskop-process-spanien-se', 'buying-process', ARRAY['Tidsram', 'Köpprocess', 'Spanien'], ARRAY['Fastighetsköp', 'Tidsram', 'Spanien', 'Process'], ARRAY['Hur lång tid tar det att köpa fastighet i Spanien', 'Tidsram för fastighetsköp Spanien'], ARRAY['Costa del Sol', 'Marbella', 'Estepona'], ARRAY['Villa', 'Lägenhet', 'Townhouse'], 'Fastighetsköp Spanien: Tidsram och Process | DelSolPrimeHomes', 'Lär dig hur lång tid fastighetsköpsprocessen i Spanien tar. Komplett guide med tidsram för varje steg av köpprocessen.', false, 28);

-- Now add new FAQ categories that don't exist yet, using INSERT ... ON CONFLICT DO NOTHING
INSERT INTO public.faq_categories (key, language, name, description, icon, sort_order) VALUES
-- German Categories (using ON CONFLICT to avoid duplicates)
('buying-process', 'de', 'Kaufprozess', 'Alles über den Immobilienkaufprozess in Spanien', 'Home', 1),
('legal-aspects', 'de', 'Rechtliche Aspekte', 'Rechtliche Informationen und Anforderungen', 'Scale', 2),
('market-trends', 'de', 'Markttrends', 'Aktuelle Marktentwicklungen und Prognosen', 'TrendingUp', 3),
('financing', 'de', 'Finanzierung', 'Hypotheken und Finanzierungsoptionen', 'CreditCard', 4),
('property-types', 'de', 'Immobilientypen', 'Verschiedene Arten von Immobilien', 'Building', 5),
('locations', 'de', 'Standorte', 'Beliebte Gebiete an der Costa del Sol', 'MapPin', 6),
('investment', 'de', 'Investment', 'Investmentstrategien und ROI-Informationen', 'PiggyBank', 7),
('services', 'de', 'Dienstleistungen', 'Unsere Services und Unterstützung', 'Users', 8),
('technology', 'de', 'Technologie', 'Innovative Technologien und Tools', 'Smartphone', 9),

-- Polish Categories
('buying-process', 'pl', 'Proces Zakupu', 'Wszystko o procesie zakupu nieruchomości w Hiszpanii', 'Home', 1),
('legal-aspects', 'pl', 'Aspekty Prawne', 'Informacje prawne i wymagania', 'Scale', 2),
('market-trends', 'pl', 'Trendy Rynkowe', 'Aktualne trendy rynkowe i prognozy', 'TrendingUp', 3),
('financing', 'pl', 'Finansowanie', 'Kredyty hipoteczne i opcje finansowania', 'CreditCard', 4),
('property-types', 'pl', 'Typy Nieruchomości', 'Różne rodzaje nieruchomości', 'Building', 5),
('locations', 'pl', 'Lokalizacje', 'Popularne obszary na Costa del Sol', 'MapPin', 6),
('investment', 'pl', 'Inwestycje', 'Strategie inwestycyjne i informacje ROI', 'PiggyBank', 7),
('services', 'pl', 'Usługi', 'Nasze usługi i wsparcie', 'Users', 8),
('technology', 'pl', 'Technologia', 'Innowacyjne technologie i narzędzia', 'Smartphone', 9),
('lifestyle', 'pl', 'Styl Życia', 'Życie na Costa del Sol', 'Sun', 10),

-- Danish Categories
('buying-process', 'dk', 'Købsprocess', 'Alt om ejendomskøbsprocessen i Spanien', 'Home', 1),
('legal-aspects', 'dk', 'Juridiske Aspekter', 'Juridisk information og krav', 'Scale', 2),
('market-trends', 'dk', 'Markedstendenser', 'Aktuelle markedsudviklinger og prognoser', 'TrendingUp', 3),
('financing', 'dk', 'Finansiering', 'Realkreditlån og finansieringsmuligheder', 'CreditCard', 4),
('property-types', 'dk', 'Ejendomstyper', 'Forskellige typer af ejendomme', 'Building', 5),
('locations', 'dk', 'Lokationer', 'Populære områder på Costa del Sol', 'MapPin', 6),
('investment', 'dk', 'Investering', 'Investeringsstrategier og ROI-information', 'PiggyBank', 7),
('services', 'dk', 'Tjenester', 'Vores services og support', 'Users', 8),
('technology', 'dk', 'Teknologi', 'Innovative teknologier og værktøjer', 'Smartphone', 9),
('lifestyle', 'dk', 'Livsstil', 'Livet på Costa del Sol', 'Sun', 10),

-- Swedish Categories
('buying-process', 'se', 'Köpprocess', 'Allt om fastighetsköpsprocessen i Spanien', 'Home', 1),
('legal-aspects', 'se', 'Juridiska Aspekter', 'Juridisk information och krav', 'Scale', 2),
('market-trends', 'se', 'Marknadstrender', 'Aktuella marknadsutvecklingar och prognoser', 'TrendingUp', 3),
('financing', 'se', 'Finansiering', 'Bolån och finansieringsalternativ', 'CreditCard', 4),
('property-types', 'se', 'Fastighetstyper', 'Olika typer av fastigheter', 'Building', 5),
('locations', 'se', 'Platser', 'Populära områden på Costa del Sol', 'MapPin', 6),
('investment', 'se', 'Investering', 'Investeringsstrategier och ROI-information', 'PiggyBank', 7),
('services', 'se', 'Tjänster', 'Våra tjänster och support', 'Users', 8),
('technology', 'se', 'Teknik', 'Innovativa teknologier och verktyg', 'Smartphone', 9),
('lifestyle', 'se', 'Livsstil', 'Livet på Costa del Sol', 'Sun', 10)
ON CONFLICT (key, language) DO NOTHING;