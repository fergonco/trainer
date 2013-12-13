package es.fergonco.deutsch.jpa;

public enum Gender {

	masculin, femenin, neuter;

	public static Gender parseByArticle(String article) {
		article = article.trim();
		if ("der".equals(article)) {
			return masculin;
		} else if ("die".equals(article)) {
			return femenin;
		} else if ("das".equals(article)) {
			return neuter;
		} else {
			throw new IllegalArgumentException("Unrecognized article: "
					+ article);
		}
	}

}
