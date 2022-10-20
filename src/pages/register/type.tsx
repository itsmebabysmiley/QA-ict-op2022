import RegistrantTypes from '~/const/register/registrantType'
import Wrapper from '~/layouts/Wrapper'
import RegistrantTypeButton from '~/routes/Register/components/RegistrantTypeButton'

const Page = () => {
  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col items-center justify-center px-8 py-10">
        <div className="mb-10 text-center font-heading text-4xl font-bold">
          <div>คุณคือใคร ?</div>
        </div>

        <div className="grid w-full grid-cols-[repeat(3,_minmax(100px,_1fr))] justify-between gap-3 sm:grid-cols-3 sm:gap-6">
          {RegistrantTypes.map((type, i) => (
            <RegistrantTypeButton
              key={type.type}
              icon={type.icon}
              label={type.label}
              variant={i % 2 === 0 ? 'primary' : 'secondary'}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

export default Page
