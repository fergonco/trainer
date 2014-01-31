package es.fergonco.deutsch;

import java.io.IOException;
import java.util.List;
import java.util.Random;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import es.fergonco.deutsch.jpa.Word;

public class GetWord extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		EntityManagerFactory factory = Persistence
				.createEntityManagerFactory("deploy");
		EntityManager em = factory.createEntityManager();
		// read the existing entries and write to console
		TypedQuery<Word> q = em.createQuery(
				"select w from Word w " + "order by w.guessFromSpanish asc",
				Word.class).setMaxResults(100);
		List<Word> words = q.getResultList();
		int idx = new Random().nextInt(words.size());
		Word random = words.get(idx);

		ObjectMapper mapper = new ObjectMapper();
		resp.setContentType("application/json");
		resp.setCharacterEncoding("utf8");
		mapper.writeValue(resp.getWriter(), random);
		em.close();
	}
}