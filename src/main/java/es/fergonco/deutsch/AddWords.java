package es.fergonco.deutsch;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.regex.Pattern;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import es.fergonco.deutsch.jpa.Gender;
import es.fergonco.deutsch.jpa.Word;

public class AddWords extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String words = req.getParameter("text");
		BufferedReader reader = new BufferedReader(new StringReader(words));
		String line;
		StringBuffer report = new StringBuffer();
		while ((line = reader.readLine()) != null) {
			String[] word = line.split(Pattern.quote(":"));
			if (word.length != 2) {
				report.append("Invalid line: " + line + "\n");
				continue;
			}
			String german = word[0];
			String spanish = word[1];
			Word newWord = new Word();
			newWord.setTranslation(spanish.trim());
			if (german.contains(" ")) {
				newWord.setSubstantive(true);
				String[] substantive = german.split(Pattern.quote(" "));
				if (substantive.length != 2) {
					report.append("Invalid German substantive: " + german
							+ "\n");
					continue;
				}
				try {
					newWord.setGender(Gender.parseByArticle(substantive[0]
							.trim().toLowerCase()));
				} catch (IllegalArgumentException e) {
					report.append("Invalid German article: " + substantive[0]
							+ "\n");
					continue;
				}
				newWord.setName(substantive[1].trim());
			} else {
				newWord.setName(german);
				newWord.setSubstantive(false);
			}

			try {
				EntityManagerFactory factory = Persistence
						.createEntityManagerFactory("deploy");
				EntityManager em = factory.createEntityManager();
				em.getTransaction().begin();
				em.merge(newWord);
				em.getTransaction().commit();
				report.append("Ok: " + newWord + "\n");
			} catch (PersistenceException e) {
				report.append("Cannot add the word: " + e.getMessage() + "\n");
			}

		}

		resp.setContentType("text/plain");
		resp.setCharacterEncoding("utf8");
		resp.getOutputStream().write(report.toString().getBytes());
	}
}
