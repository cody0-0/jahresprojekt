CREATE TABLE Database (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255),
    title-img VARCHAR(500),
    minf BIT NOT NULL,
    musk BIT NOT NULL,
    date VARCHAR(100),
)

 INSERT INTO Database (id INTEGER,title VARCHAR(255), title-img VARCHAR(500), minf BIT NOT NULL, musk BIT NOT NULL, date VARCHAR(100))
 VALUES (1, "A CODED DAY", "A_CODED_DAY.png", 0, 1, "12.März 2024", "Film")
 INSERT INTO Database VALUES(2, "Nachruf auf Lothar Werthschulte", "Nachruf_Auf_Lothar.jpg", 1, 1, "5.Februar 2024")
 INSERT INTO Database VALUES(3, "Der Filmabend", "Filmabend.png", 1, 0, "8.Dezember 2023")
 INSERT INTO Database VALUES(4, "MedieninformatikerInnen der Hochschule Harz zu Besuch im Zentrum für Kunst und Medien in Karlsruhe", "Besuch_ZKM.png", 1, 1, "20.November 2023")
 INSERT INTO Database VALUES(5, "Making of... Filme machen am Studiengang Medieninformatik", "Making_Of.png", 1, 0, "15.Oktober 2023")
 INSERT INTO Database VALUES(6, "Motion Capture im Forschungsprojekt DigiLehR", "MoCap_DigiLehR.png", 1, 0, "25.Juni 2023")
 INSERT INTO Database VALUES(7, "Landschaftsfotografie und das Anthropozän", "Landschaftsfotografie.png", 1, 0, "23.Juni 2023")
 INSERT INTO Database VALUES(8, "Querschnitt-Tag der offenen Tür an der Hochschule Harz", "Querschnitt.png", 1, 1, "13.Juni 2023")
 INSERT INTO Database VALUES(9, "IMPLUS-Das Kultevent in Haus 9", "IMPULS.png", 1, 1, "8.Juni 2023")
 INSERT INTO Database VALUES(10, "Full House-Agentur B12 zu Besuch an der Hochschule Harz", "Full_House.png", 1, 0, "8.Juni 2023")
 INSERT INTO Database VALUES(11, "Filme drehen-Studierende der Medieninformatik bei der Arbeit", "Filme_drehen.png", 1, 0, "2.Juni 2023")
 INSERT INTO Database VALUES(12, "Global Game Jam '23- Digital wider Willen", "GGJ23.png", 1, 1, "5.April 2023")
 INSERT INTO Database VALUES(13, "Fotografie-Ausstellung im Kreativloft", "Fotografie_Ausstellung.jpg", 1, 0, "5.April 2023")
 INSERT INTO Database VALUES(14, "Masken und Gesichter-Filmdreh an der Hochschule Harz", "Masken_Gesichter.png", 0, 1, "30.Januar 2023")
 INSERT INTO Database VALUES(15, "Keying im Studio Hochschule Harz", "Keying.png", 1, 0, "20.Januar 2023")
 INSERT INTO Database VALUES(16, "Zwei Sekunden Stille", "Zwei_Sekunden_Stille.png", 1, 0, "14.Dezember 2022")
 INSERT INTO Database VALUES(17, "Der Kuriositär, Kurzfilm von Luca Joel Spirka, gewinnt beim 27.Jugendfilmpreis Sachsen-Anhalt", "DerKuriositär.png", 1, 0, "22.November 2022")
 INSERT INTO Database VALUES(18, "Reality Check 2022", "RealityCheck.png", 1, 1, "7.November 2022")
 INSERT INTO Database VALUES(19, "Studierende der Medieninformatik präsentieren kurze Spielfilme und Animationen", "Spielfilme_Animationen.png", 1, 0, "4.November 2022")
 INSERT INTO Database VALUES(20, "MINFF 2022", "Minff22.jpg", 1, 1, "28.Juni 2022")
 INSERT INTO Database VALUES(21, "Sunny Side Up", "SunnySideUp.png", 1, 1, "22.Juni 2022")
 INSERT INTO Database VALUES(22, "Back to the Roots", "BackToTheRoots.png", 1, 1, "19.Mai 2022")
 INSERT INTO Database VALUES(23, "Jahresprojekt, zum Beispiel Produktfilm", "Jahresprojekt.png", 1, 0, "21.Juni 2022")
 INSERT INTO Database VALUES(24, "Der Prototyp für Erfolg", "Prototyp_fuer_Erfolg.png", 1, 0, "13.September 2023")
 INSERT INTO Database VALUES(25, "Animation der anderen Art", "3D-AnimationsFrame.png", 1, 0, "21.September 2023")
 INSERT INTO Database VALUES(26, "Eine Suche nach Inspiration", "InspirationGesucht.png", 1, 0, "23.Februar 2023")


CREATE TABLE Filter (
    id INTEGER,
    CategoryName VARCHAR(255),
    FOREIGN KEY (id) REFERENCES Database(id),
)

INSERT INTO Filter (id INTEGER, CategoryName VARCHAR(255)) VALUES (1, "Film & Audio")
INSERT INTO Filter VALUES(2, "Film & Audio")
INSERT INTO Filter VALUES(3, "Animation")
INSERT INTO Filter VALUES(3, "Film & Audio")
INSERT INTO Filter VALUES(4, "Events")
INSERT INTO Filter VALUES(5, "Film & Audio")
INSERT INTO Filter VALUES(6, "Film & Audio")
INSERT INTO Filter VALUES(6, "Grafik")
INSERT INTO Filter VALUES(7, "Fotografie")
INSERT INTO Filter VALUES(8, "Events")
INSERT INTO Filter VALUES(8, "Web")
INSERT INTO Filter VALUES(9, "Events")
INSERT INTO Filter VALUES(10, "Events")
INSERT INTO Filter VALUES(11, "Film & Audio")
INSERT INTO Filter VALUES(12, "Games")
INSERT INTO Filter VALUES(12, "Coding")
INSERT INTO Filter VALUES(12, "Animation")
INSERT INTO Filter VALUES(13, "Events")
INSERT INTO Filter VALUES(14, "Film & Audio")
INSERT INTO Filter VALUES(15, "Film & Audio")
INSERT INTO Filter VALUES(16, "Events")
INSERT INTO Filter VALUES(17, "Film & Audio")
INSERT INTO Filter VALUES(17, "Animation")
INSERT INTO Filter VALUES(17, "Events")
INSERT INTO Filter VALUES(18, "Events")
INSERT INTO Filter VALUES(19, "Animation")
INSERT INTO Filter VALUES(19, "Film & Audio")
INSERT INTO Filter VALUES(20, "Film & Audio")
INSERT INTO Filter VALUES(20, "Games")
INSERT INTO Filter VALUES(20, "Web")
INSERT INTO Filter VALUES(20, "Events")
INSERT INTO Filter VALUES(21, "Events")
INSERT INTO Filter VALUES(21, "Fotografie")
INSERT INTO Filter VALUES(21, "Games")
INSERT INTO Filter VALUES(21, "Film & Audio")
INSERT INTO Filter VALUES(21, "Grafik")
INSERT INTO Filter VALUES(21, "Animation")
INSERT INTO Filter VALUES(21, "Coding")
INSERT INTO Filter VALUES(21, "Web")
INSERT INTO Filter VALUES(22, "Games")
INSERT INTO Filter VALUES(23, "Film & Audio")
INSERT INTO Filter VALUES(23, "Grafik")
INSERT INTO Filter VALUES(24, "Grafik")
INSERT INTO Filter VALUES(24, "Film & Audio")
INSERT INTO Filter VALUES(25, "Animation")
INSERT INTO Filter VALUES(25, "Film & Audio")
INSERT INTO Filter VALUES(26, "Grafik")
