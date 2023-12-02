import Login from '../components/Login';
import Header from '../components/Header';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Header />
      <Login />
    </main>
  );
}