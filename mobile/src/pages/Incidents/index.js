import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, View, FlatList, TouchableOpacity } from "react-native";

// Touchable, torna tudo aquilo em tocavel e diminui a opacidade do componente.
import api from "../../services/api";
import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    /**
     * Impedindo que outro carregamento seja realizado em
     * parelo ao atual.
     */
    if (loading) {
      return;
    }

    /**
     * Se o total for maior que zero, e a lista total dos incident for
     * igual ao total, é pq tudo já foi carregado, e não faz sentido carregar mais.
     */
    if ((total > 0) & (incidents.length === total)) {
      return;
    }

    setLoading(true);

    const response = await api.get(`/incidents`, { params: { page } });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);

    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      {/* Componente de Renderização de listas que autocarregam. 
        Em ReactNative, para fazer com que os itens serem renderizados em 
        forma de lista, é preciso que do componente chamado FlatList. Nele, temos 
        3 propriedades importantes:
        -> Data => O dado que está sendo renderizado
        -> KeyExtractor => Chave Unica de Cada elemento
        -> RenderItem => O componente em si, e como ele está sendo renderizado.
      */}
      <FlatList
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        style={styles.incidentList}
        showsVerticalScrollIndicator={false}
        // Quando o usuário chegar no final da lista, já carrega mais itens.
        onEndReached={loadIncidents}
        // Quando ele pode começar a carregar os itens (quando estiver visto quantos % da lista?)
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {/* Para que o Intl funcione no ReactNative, é necessário instalar o pacote do Intl, e importar no inicio da aplicação */}
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={17} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
