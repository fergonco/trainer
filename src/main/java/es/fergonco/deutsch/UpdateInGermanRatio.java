package es.fergonco.deutsch;

import java.io.IOException;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import es.fergonco.deutsch.jpa.Word;

public class UpdateInGermanRatio extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String result = req.getParameter("result");
		boolean improve;
		if ("good".equals(result)) {
			improve = true;
		} else if ("bad".equals(result)) {
			improve = false;
		} else {
			throw new StatusException(400,
					"result parameter must be either 'good' or 'bad'");
		}
		EntityManagerFactory factory = Persistence
				.createEntityManagerFactory("deploy");
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		String wordName = req.getParameter("word");
		Word word = (Word) em.find(Word.class, wordName);
		double ratio = word.getGuessFromSpanish();
		if (improve) {
			ratio = ratio + 1;
		} else {
			ratio = ratio / 2;
		}
		word.setGuessFromSpanish(ratio);
		em.getTransaction().commit();
	}
}
