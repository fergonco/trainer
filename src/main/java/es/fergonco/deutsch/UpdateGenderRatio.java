package es.fergonco.deutsch;

import java.io.IOException;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import es.fergonco.deutsch.jpa.WordStatus;

public class UpdateGenderRatio extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String user = req.getParameter("user");
		if (user == null) {
			throw new StatusException(401, "User parameter is mandatory");
		}
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
		TypedQuery<WordStatus> query = em.createQuery(
				"SELECT w FROM WordStatus w WHERE w.word='" + wordName
						+ "' AND w.user='" + user + "';", WordStatus.class);
		WordStatus wordStatus = query.getSingleResult();
		double ratio = wordStatus.getGuessGenderFailureRate();
		if (improve) {
			ratio = ratio + 1;
		} else {
			ratio = ratio - 3;
		}
		wordStatus.setGuessGenderFailureRate(ratio);
		em.getTransaction().commit();
	}
}
