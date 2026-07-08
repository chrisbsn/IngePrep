import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import { schools, audienceProfiles } from "../../data/schools"
import "./Audience.css"

export default function Audience() {
  return (
    <section className="audience" id="pour-qui">
      <Container>
        <SectionTitle
          eyebrow="Pour qui"
          title="Pensé pour les candidats à l'ESA en Belgique francophone"
          description="Que tu sois encore au secondaire ou en année de préparation dédiée, IngePrep s'adresse à toi si tu vises une des quatre écoles polytechniques."
        />

        <div className="audience__profiles">
          {audienceProfiles.map((profile) => (
            <div className="audience__profile" key={profile.title}>
              <h3>{profile.title}</h3>
              <p>{profile.description}</p>
            </div>
          ))}
        </div>

        <div className="audience__schools">
          {schools.map((school) => (
            <div className="audience__school" key={school.code}>
              <span className="audience__school-code">{school.code}</span>
              <span className="audience__school-name">{school.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
