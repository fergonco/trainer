package es.fergonco.deutsch;

import java.io.IOException;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import es.fergonco.deutsch.jpa.Word;

public class UpdateWord extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String wordString = req.getParameter("word");
		ObjectMapper mapper = new ObjectMapper();
		Word word = mapper.readValue(wordString, Word.class);

		EntityManagerFactory factory = Persistence
				.createEntityManagerFactory("deploy");
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		em.merge(word);
		em.getTransaction().commit();
	}
}
