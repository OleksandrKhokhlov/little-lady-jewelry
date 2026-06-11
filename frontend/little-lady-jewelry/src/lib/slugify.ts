export const createSlug = (text: string): string => {
  const ukr =
    "а_б_в_г_ґ_д_е_є_ж_з_и_і_ї_й_к_л_м_н_о_п_р_с_т_у_ф_х_ц_ч_ш_щ_ь_ю_я".split(
      "_",
    );
  const lat =
    "a_b_v_h_g_d_e_ye_zh_z_y_i_yi_y_k_l_m_n_o_p_r_s_t_u_f_kh_ts_ch_sh_shch__yu_ya".split(
      "_",
    );

  let slug = text.toLowerCase().trim();

  // Заменяем украинские буквы на латынь
  ukr.forEach((char, index) => {
    slug = slug.replaceAll(char, lat[index]);
  });

  return slug
    .replace(/[^a-z0-9 -]/g, "") // Удаляем спецсимволы (кавычки, знаки препинания)
    .replace(/\s+/g, "-") // Заменяем пробелы на дефисы
    .replace(/-+/g, "-"); // Удаляем двойные дефисы
};
