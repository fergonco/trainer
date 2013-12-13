package es.fergonco.deutsch.utils;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.Scanner;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.apache.commons.io.IOUtils;

import es.fergonco.deutsch.jpa.Gender;
import es.fergonco.deutsch.jpa.Word;
import geomatico.xpath.XPathableText;

public class WiktionaryParser {

	public static void main(String[] args) throws Exception {
		InputStream input = WiktionaryParser.class
				.getResourceAsStream("/words.txt");
		Scanner scanner = new Scanner(input);
		ArrayList<Word> words = new ArrayList<Word>();
		int count = 0;
		while (scanner.hasNext() && count < 555555) {
			String german = scanner.nextLine();
			System.out.println(german);
			String wordXML = null;

			int tries = 0;
			while (tries < 3) {
				System.out.println("getting from leo...");
				String url = "http://dict.leo.org/"
						+ "dictQuery/m-vocab/esde/query.xml?"
						+ "tolerMode=nof&lp=esde&lang=de&"
						+ "rmWords=off&rmSearch=on&directN=0&search=" + german
						+ "&searchLoc=0&resultOrder=basic&"
						+ "multiwordShowSingle=on&sectLenMax=16";
				System.out.println(url);
				try {
					wordXML = IOUtils.toString(new URL(url));
					tries = 3;// to exit
				} catch (IOException e) {
					e.printStackTrace();
					synchronized (WiktionaryParser.class) {
						try {
							WiktionaryParser.class.wait(20000);
						} catch (InterruptedException e1) {
						}
					}
				}
				tries++;
			}
			if (wordXML != null) {
				XPathableText xText = new XPathableText(wordXML);
				String spanish = xText
						.evaluate("/xml/sectionlist/section/entry[1]/"
								+ "side[@lang='es']/words/word");
				String gender = xText.evaluate(
						"/xml/sectionlist/section/entry[1]/"
								+ "side[@lang='de']/words/word")
						.substring(0, 4);
				String substantive = xText
						.evaluate("/xml/sectionlist/section/@sctTitle");

				Word word = new Word();
				word.setName(german);
				word.setTranslation(spanish);
				word.setGender(Gender.parseByArticle(gender));
				word.setSubstantive("Substantive".equals(substantive));
				words.add(word);
			}

			count++;
		}
		EntityManagerFactory factory = Persistence
				.createEntityManagerFactory("deploy");
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		for (Word word : words) {
			em.persist(word);
		}
		em.getTransaction().commit();
		em.close();
	}

}
