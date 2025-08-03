-- Add multilingual FAQ categories for Dutch, French, German, Polish, Swedish, Danish
INSERT INTO faq_categories (key, language, name, description, icon, sort_order) VALUES
-- Dutch (nl)
('buying', 'nl', 'Onroerend goed kopen', 'Vragen over het koopproces', 'Home', 1),
('selling', 'nl', 'Onroerend goed verkopen', 'Vragen over het verkoopproces', 'TrendingUp', 2),
('viewing', 'nl', 'Bezichtigingsreis', 'Vragen over bezichtigingsreizen', 'MapPin', 3),
('taxes', 'nl', 'Belastingen en kosten', 'Vragen over belastingen en kosten', 'Calculator', 4),
('legal', 'nl', 'Juridisch en financieel', 'Vragen over juridische en financiële aspecten', 'FileText', 5),
('lifestyle', 'nl', 'Levensstijl en integratie', 'Vragen over leven aan de Costa del Sol', 'Users', 6),

-- French (fr)
('buying', 'fr', 'Acheter un bien immobilier', 'Questions sur le processus d''achat', 'Home', 1),
('selling', 'fr', 'Vendre un bien immobilier', 'Questions sur le processus de vente', 'TrendingUp', 2),
('viewing', 'fr', 'Voyage de visite', 'Questions sur les voyages de visite', 'MapPin', 3),
('taxes', 'fr', 'Taxes et frais', 'Questions sur les taxes et frais', 'Calculator', 4),
('legal', 'fr', 'Juridique et financier', 'Questions juridiques et financières', 'FileText', 5),
('lifestyle', 'fr', 'Style de vie et intégration', 'Questions sur la vie sur la Costa del Sol', 'Users', 6),

-- German (de)
('buying', 'de', 'Immobilie kaufen', 'Fragen zum Kaufprozess', 'Home', 1),
('selling', 'de', 'Immobilie verkaufen', 'Fragen zum Verkaufsprozess', 'TrendingUp', 2),
('viewing', 'de', 'Besichtigungsreise', 'Fragen zu Besichtigungsreisen', 'MapPin', 3),
('taxes', 'de', 'Steuern und Gebühren', 'Fragen zu Steuern und Gebühren', 'Calculator', 4),
('legal', 'de', 'Rechtliches und Finanzielles', 'Rechtliche und finanzielle Fragen', 'FileText', 5),
('lifestyle', 'de', 'Lebensstil und Integration', 'Fragen zum Leben an der Costa del Sol', 'Users', 6),

-- Polish (pl)
('buying', 'pl', 'Kupno nieruchomości', 'Pytania o proces kupna', 'Home', 1),
('selling', 'pl', 'Sprzedaż nieruchomości', 'Pytania o proces sprzedaży', 'TrendingUp', 2),
('viewing', 'pl', 'Podróż oglądania', 'Pytania o podróże oglądania', 'MapPin', 3),
('taxes', 'pl', 'Podatki i opłaty', 'Pytania o podatki i opłaty', 'Calculator', 4),
('legal', 'pl', 'Prawne i finansowe', 'Pytania prawne i finansowe', 'FileText', 5),
('lifestyle', 'pl', 'Styl życia i integracja', 'Pytania o życie na Costa del Sol', 'Users', 6),

-- Swedish (se)
('buying', 'se', 'Köpa fastighet', 'Frågor om köpprocessen', 'Home', 1),
('selling', 'se', 'Sälja fastighet', 'Frågor om säljprocessen', 'TrendingUp', 2),
('viewing', 'se', 'Besöksresa', 'Frågor om besöksresor', 'MapPin', 3),
('taxes', 'se', 'Skatter och avgifter', 'Frågor om skatter och avgifter', 'Calculator', 4),
('legal', 'se', 'Juridiskt och finansiellt', 'Juridiska och finansiella frågor', 'FileText', 5),
('lifestyle', 'se', 'Livsstil och integration', 'Frågor om att bo på Costa del Sol', 'Users', 6),

-- Danish (dk)
('buying', 'dk', 'Køb af ejendom', 'Spørgsmål om købsprocessen', 'Home', 1),
('selling', 'dk', 'Salg af ejendom', 'Spørgsmål om salgsprocessen', 'TrendingUp', 2),
('viewing', 'dk', 'Besøgsrejse', 'Spørgsmål om besøgsrejser', 'MapPin', 3),
('taxes', 'dk', 'Skatter og gebyrer', 'Spørgsmål om skatter og gebyrer', 'Calculator', 4),
('legal', 'dk', 'Juridisk og finansielt', 'Juridiske og finansielle spørgsmål', 'FileText', 5),
('lifestyle', 'dk', 'Livsstil og integration', 'Spørgsmål om at bo på Costa del Sol', 'Users', 6);

-- Add sample translated FAQs for key questions in each language
-- Dutch FAQs (nl)
INSERT INTO faqs (language, question, answer_short, answer_long, slug, category, tags, keywords, voice_queries, target_areas, property_types, is_featured, sort_order) VALUES
('nl', 'Wat zijn de totale kosten van het kopen van een eigendom in Spanje?', 'De totale kosten zijn ongeveer 10-15% van de aankoopprijs.', 'De totale kosten omvatten de aankoopprijs plus ongeveer 10-15% extra kosten. Dit omvat overdrachtsbelasting (6-10%), notariskosten (€1.000-€2.500), advocaatkosten (1-2% van de eigendomsprijs), en registratiekosten. Voor nieuwe eigendommen betaalt u BTW (10%) in plaats van overdrachtsbelasting.', 'totale-kosten-kopen-eigendom-spanje-nl', 'buying', ARRAY['kosten', 'belastingen', 'kopen'], ARRAY['totale kosten', 'eigendom kopen', 'Spanje kosten'], ARRAY['wat kost het om een huis te kopen in spanje', 'hoeveel kost een eigendom in spanje'], ARRAY['Costa del Sol', 'Marbella', 'Estepona'], ARRAY['villa', 'appartement'], true, 1),

('nl', 'Kunnen buitenlanders eigendom kopen in Spanje?', 'Ja, buitenlanders kunnen vrijelijk eigendom kopen in Spanje.', 'Ja, buitenlanders hebben dezelfde rechten als Spaanse staatsburgers om eigendom te kopen in Spanje. U heeft geen verblijfsvergunning nodig om eigendom te bezitten. Het enige dat u nodig heeft is een NIE-nummer (Número de Identificación de Extranjero) voor belastingdoeleinden.', 'buitenlanders-eigendom-kopen-spanje-nl', 'buying', ARRAY['buitenlanders', 'eigendomsrecht', 'legaliteit'], ARRAY['buitenlanders kopen', 'eigendomsrechten', 'spaans eigendom'], ARRAY['kunnen buitenlanders een huis kopen in spanje', 'mag ik als buitenlander eigendom kopen'], ARRAY['Costa del Sol'], ARRAY['villa', 'appartement', 'penthouse'], true, 2),

-- French FAQs (fr)
('fr', 'Quels sont les coûts totaux d''achat d''une propriété en Espagne?', 'Les coûts totaux représentent environ 10-15% du prix d''achat.', 'Les coûts totaux comprennent le prix d''achat plus environ 10-15% de coûts supplémentaires. Cela inclut les droits de mutation (6-10%), les frais de notaire (1.000-2.500€), les frais d''avocat (1-2% du prix de la propriété), et les frais d''enregistrement. Pour les propriétés neuves, vous payez la TVA (10%) au lieu des droits de mutation.', 'couts-totaux-achat-propriete-espagne-fr', 'buying', ARRAY['coûts', 'taxes', 'achat'], ARRAY['coûts totaux', 'achat propriété', 'coûts espagne'], ARRAY['combien coûte l''achat d''une maison en espagne', 'quel est le coût d''une propriété en espagne'], ARRAY['Costa del Sol', 'Marbella', 'Estepona'], ARRAY['villa', 'appartement'], true, 1),

('fr', 'Les étrangers peuvent-ils acheter une propriété en Espagne?', 'Oui, les étrangers peuvent librement acheter une propriété en Espagne.', 'Oui, les étrangers ont les mêmes droits que les citoyens espagnols pour acheter une propriété en Espagne. Vous n''avez pas besoin d''un permis de séjour pour posséder une propriété. Tout ce dont vous avez besoin est un numéro NIE (Número de Identificación de Extranjero) à des fins fiscales.', 'etrangers-achat-propriete-espagne-fr', 'buying', ARRAY['étrangers', 'droits propriété', 'légalité'], ARRAY['étrangers achat', 'droits propriété', 'propriété espagnole'], ARRAY['les étrangers peuvent-ils acheter une maison en espagne', 'puis-je acheter une propriété en tant qu''étranger'], ARRAY['Costa del Sol'], ARRAY['villa', 'appartement', 'penthouse'], true, 2),

-- German FAQs (de)
('de', 'Was sind die Gesamtkosten beim Kauf einer Immobilie in Spanien?', 'Die Gesamtkosten betragen etwa 10-15% des Kaufpreises.', 'Die Gesamtkosten umfassen den Kaufpreis plus etwa 10-15% zusätzliche Kosten. Dies beinhaltet Grunderwerbsteuer (6-10%), Notarkosten (€1.000-€2.500), Anwaltskosten (1-2% des Immobilienpreises) und Registrierungsgebühren. Bei Neubauten zahlen Sie Mehrwertsteuer (10%) anstelle der Grunderwerbsteuer.', 'gesamtkosten-immobilienkauf-spanien-de', 'buying', ARRAY['kosten', 'steuern', 'kauf'], ARRAY['gesamtkosten', 'immobilienkauf', 'spanien kosten'], ARRAY['was kostet der kauf eines hauses in spanien', 'wie viel kostet eine immobilie in spanien'], ARRAY['Costa del Sol', 'Marbella', 'Estepona'], ARRAY['villa', 'wohnung'], true, 1),

('de', 'Können Ausländer Immobilien in Spanien kaufen?', 'Ja, Ausländer können frei Immobilien in Spanien kaufen.', 'Ja, Ausländer haben die gleichen Rechte wie spanische Staatsbürger beim Immobilienkauf in Spanien. Sie benötigen keine Aufenthaltserlaubnis, um Immobilien zu besitzen. Alles was Sie brauchen ist eine NIE-Nummer (Número de Identificación de Extranjero) für Steuerzwecke.', 'auslaender-immobilienkauf-spanien-de', 'buying', ARRAY['ausländer', 'eigentumsrechte', 'legalität'], ARRAY['ausländer kauf', 'eigentumsrechte', 'spanische immobilie'], ARRAY['können ausländer ein haus in spanien kaufen', 'darf ich als ausländer immobilien kaufen'], ARRAY['Costa del Sol'], ARRAY['villa', 'wohnung', 'penthouse'], true, 2),

-- Polish FAQs (pl)
('pl', 'Jakie są całkowite koszty zakupu nieruchomości w Hiszpanii?', 'Całkowite koszty wynoszą około 10-15% ceny zakupu.', 'Całkowite koszty obejmują cenę zakupu plus około 10-15% dodatkowych kosztów. Obejmuje to podatek od przeniesienia własności (6-10%), koszty notarialne (1.000-2.500€), koszty prawne (1-2% ceny nieruchomości) i opłaty rejestracyjne. W przypadku nowych nieruchomości płacisz VAT (10%) zamiast podatku od przeniesienia własności.', 'calkowite-koszty-zakup-nieruchomosci-hiszpania-pl', 'buying', ARRAY['koszty', 'podatki', 'zakup'], ARRAY['całkowite koszty', 'zakup nieruchomości', 'koszty hiszpania'], ARRAY['ile kosztuje zakup domu w hiszpanii', 'jaka jest cena nieruchomości w hiszpanii'], ARRAY['Costa del Sol', 'Marbella', 'Estepona'], ARRAY['willa', 'mieszkanie'], true, 1),

('pl', 'Czy cudzoziemcy mogą kupować nieruchomości w Hiszpanii?', 'Tak, cudzoziemcy mogą swobodnie kupować nieruchomości w Hiszpanii.', 'Tak, cudzoziemcy mają takie same prawa jak obywatele hiszpańscy do zakupu nieruchomości w Hiszpanii. Nie potrzebujesz pozwolenia na pobyt, aby posiadać nieruchomość. Wszystko czego potrzebujesz to numer NIE (Número de Identificación de Extranjero) do celów podatkowych.', 'cudzoziemcy-zakup-nieruchomosci-hiszpania-pl', 'buying', ARRAY['cudzoziemcy', 'prawa własności', 'legalność'], ARRAY['cudzoziemcy zakup', 'prawa własności', 'hiszpańska nieruchomość'], ARRAY['czy cudzoziemcy mogą kupić dom w hiszpanii', 'czy mogę kupić nieruchomość jako cudzoziemiec'], ARRAY['Costa del Sol'], ARRAY['willa', 'mieszkanie', 'penthouse'], true, 2),

-- Swedish FAQs (se)
('se', 'Vad är de totala kostnaderna för att köpa en fastighet i Spanien?', 'De totala kostnaderna är cirka 10-15% av köpeskillingen.', 'De totala kostnaderna inkluderar köpeskillingen plus cirka 10-15% extra kostnader. Detta inkluderar stämpelskatt (6-10%), notariekostnader (€1.000-€2.500), juridiska kostnader (1-2% av fastighetspriset), och registreringsavgifter. För nya fastigheter betalar du moms (10%) istället för stämpelskatt.', 'totala-kostnader-kop-fastighet-spanien-se', 'buying', ARRAY['kostnader', 'skatter', 'köp'], ARRAY['totala kostnader', 'fastighetsköp', 'spanien kostnader'], ARRAY['vad kostar det att köpa ett hus i spanien', 'hur mycket kostar en fastighet i spanien'], ARRAY['Costa del Sol', 'Marbella', 'Estepona'], ARRAY['villa', 'lägenhet'], true, 1),

('se', 'Kan utlänningar köpa fastighet i Spanien?', 'Ja, utlänningar kan fritt köpa fastighet i Spanien.', 'Ja, utlänningar har samma rättigheter som spanska medborgare att köpa fastighet i Spanien. Du behöver inte uppehållstillstånd för att äga fastighet. Allt du behöver är ett NIE-nummer (Número de Identificación de Extranjero) för skatteändamål.', 'utlanningar-kop-fastighet-spanien-se', 'buying', ARRAY['utlänningar', 'äganderätt', 'legalitet'], ARRAY['utlänningar köp', 'äganderätt', 'spansk fastighet'], ARRAY['kan utlänningar köpa ett hus i spanien', 'får jag köpa fastighet som utlänning'], ARRAY['Costa del Sol'], ARRAY['villa', 'lägenhet', 'penthouse'], true, 2),

-- Danish FAQs (dk)
('dk', 'Hvad er de samlede omkostninger ved at købe en ejendom i Spanien?', 'De samlede omkostninger er cirka 10-15% af købsprisen.', 'De samlede omkostninger inkluderer købsprisen plus cirka 10-15% ekstra omkostninger. Dette inkluderer overdragelsesskat (6-10%), notaromkostninger (€1.000-€2.500), juridiske omkostninger (1-2% af ejendomsprisen), og registreringsgebyrer. For nye ejendomme betaler du moms (10%) i stedet for overdragelsesskat.', 'samlede-omkostninger-kob-ejendom-spanien-dk', 'buying', ARRAY['omkostninger', 'skatter', 'køb'], ARRAY['samlede omkostninger', 'ejendomskøb', 'spanien omkostninger'], ARRAY['hvad koster det at købe et hus i spanien', 'hvor meget koster en ejendom i spanien'], ARRAY['Costa del Sol', 'Marbella', 'Estepona'], ARRAY['villa', 'lejlighed'], true, 1),

('dk', 'Kan udlændinge købe ejendom i Spanien?', 'Ja, udlændinge kan frit købe ejendom i Spanien.', 'Ja, udlændinge har samme rettigheder som spanske statsborgere til at købe ejendom i Spanien. Du behøver ikke opholdstilladelse for at eje ejendom. Alt du behøver er et NIE-nummer (Número de Identificación de Extranjero) til skatteformål.', 'udlaendinge-kob-ejendom-spanien-dk', 'buying', ARRAY['udlændinge', 'ejendomsret', 'legalitet'], ARRAY['udlændinge køb', 'ejendomsret', 'spansk ejendom'], ARRAY['kan udlændinge købe et hus i spanien', 'må jeg købe ejendom som udlænding'], ARRAY['Costa del Sol'], ARRAY['villa', 'lejlighed', 'penthouse'], true, 2);