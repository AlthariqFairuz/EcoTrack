import React, { useState, useCallback, useMemo } from 'react';
import {
  Text, View, ScrollView, Modal, Pressable, Alert, TextInput
} from 'react-native';
import Header from '@/components/header/header';
import Toast from 'react-native-toast-message';
import ActivityType from '@/components/track/ActivityType';
import Activity from '@/components/track/Activity';
import TotalEmision from '@/components/track/TotalEmision';
import { Dropdown } from 'react-native-element-dropdown';

export default function Track() {
  const [modalVisible, setModalVisible] = useState(false);
  const [typeActivity, setTypeActivity] = useState('');
  const [activityName, setActivityName] = useState('');
  const [activityDesc, setActivityDesc] = useState('');
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [activityData, setActivityData] = useState([
    {
      name: 'Pergi ke kantor',
      time: makeTime(8, 30),
      description: 'Honda Civic, 15.2 km',
      type: 'Transportasi',
      param1: 'car',
      param2: 5,
      carbon: 7.5,
    },
    {
      name: 'Makan siang',
      time: makeTime(12, 45),
      description: 'Burger daging, porsi sedang',
      type: 'Makanan',
      param1: 'Sedang',
      param2: 5,
      carbon: 4,
    },
    {
      name: 'Belanja kebutuhan',
      time: makeTime(18, 20),
      description: 'Whole food, struk di-scan',
      type: 'Belanja',
      param1: 'Ringan',
      param2: 5,
      carbon: 2.5,
    },
  ]);

  const activityContent = useMemo(() => [
    { name: 'Transportasi', photo: require('@/assets/images/track/transportasi.svg') },
    { name: 'Makanan', photo: require('@/assets/images/track/makanan.svg') },
    { name: 'Energi', photo: require('@/assets/images/track/energy.svg') },
    { name: 'Belanja', photo: require('@/assets/images/track/belanja.svg') },
  ], []);

  function makeTime(hour: number, minute: number) {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  const getCarbonValue = useCallback((): number => {
    const usage = parseFloat(param2 || '0');

    switch (typeActivity) {
      case 'Transportasi':
        return calculateCarbonTransportation(usage, param1 as 'car' | 'bus' | 'bike' | 'walk');
      case 'Makanan':
        return calculateCarbonFood(param1 as 'Berat' | 'Sedang' | 'Ringan', usage);
      case 'Energi':
        return calculateCarbonEnergy(param1 as 'Berat' | 'Sedang' | 'Ringan', usage);
      case 'Belanja':
        return calculateCarbonShopping(param1 as 'Berat' | 'Sedang' | 'Ringan', usage);
      default:
        return 0;
    }
  }, [typeActivity, param1, param2]);

  function calculateCarbonTransportation(
    distance: number,
    mode: 'car' | 'bus' | 'bike' | 'walk'
  ): number {
    const factor: { [key in 'car' | 'bus' | 'bike' | 'walk']: number } = { car: 0.2, bus: 0.05, bike: 0.01, walk: 0 };
    return distance * (factor[mode] || 0);
  }

  function calculateCarbonFood(level: 'Berat' | 'Sedang' | 'Ringan', porsi: number): number {
    const factor = { Berat: 2.5, Sedang: 1.8, Ringan: 0.5 };
    return (factor[level] || 0) * porsi;
  }

  function calculateCarbonEnergy(level: 'Berat' | 'Sedang' | 'Ringan', kwh: number): number {
    const factor = { Berat: 0.7, Sedang: 0.5, Ringan: 0.3 };
    return (factor[level] || 0) * kwh;
  }

  function calculateCarbonShopping(level: 'Berat' | 'Sedang' | 'Ringan', jumlah: number): number {
    const factor = { Berat: 1.0, Sedang: 0.5, Ringan: 0.2 };
    return (factor[level] || 0) * jumlah;
  }

  const handleAddActivity = useCallback(() => {
    if (!activityName || !activityDesc || !param1 || !param2) {
        Alert.alert('Harap isi semua input');
        return;
    }

    const newItem = {
        name: activityName,
        description: activityDesc,
        time: makeTime(new Date().getHours(), new Date().getMinutes()),
        type: typeActivity,
        carbon: getCarbonValue(),
        param1: param1,
        param2: Number(param2),
    };

    if (isEditing) {
        const index = activityData.findIndex(
            (item) =>
                item.name === activityName &&
                item.description === activityDesc &&
                item.type === typeActivity
        );
        if (index !== -1) {
            setActivityData(prev => {
                const updated = [...prev];
                updated[index] = newItem;
                return updated;
            });
        }
        Toast.show({ text1: 'Aktivitas diubah' });
        setIsEditing(false);
    } else {
        setActivityData(prev => [...prev, newItem]);
        Toast.show({ text1: 'Aktivitas ditambahkan' });
    }

    setActivityName('');
    setActivityDesc('');
    setParam1('');
    setParam2('');
    setModalVisible(false);
  }, [activityName, activityDesc, param1, param2, typeActivity, getCarbonValue, isEditing, activityData]);

  const handleDeleteActivity = useCallback((index: number) => {
    Alert.alert('Hapus Aktivitas?', '', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus', style: 'destructive',
        onPress: () => setActivityData(prev => prev.filter((_, i) => i !== index))
      }
    ]);
  }, []);

  const transportationData = useMemo(() => [
    { label: 'Mobil', value: 'car' },
    { label: 'Bus', value: 'bus' },
    { label: 'Sepeda', value: 'bike' },
    { label: 'Jalan Kaki', value: 'walk' },
  ], []);

  const categoryData = useMemo(() => [
    { label: 'Berat', value: 'Berat' },
    { label: 'Sedang', value: 'Sedang' },
    { label: 'Ringan', value: 'Ringan' },
  ], []);

  const DropdownInput = useCallback(({ label, data, value, onChange }: any) => (
    <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        placeholder={`Pilih ${label}`}
        value={value}
        onChange={item => onChange(item.value)}
        style={{
            backgroundColor: '#FFF7ED',
            borderColor: '#537D5D',
            borderWidth: 1,
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginBottom: 12,
        }}
        placeholderStyle={{
            fontSize: 14,
            color: '#537D5D',
        }}
        selectedTextStyle={{
            fontSize: 14,
            color: '#000000',
        }}
        itemTextStyle={{
            color: '#374151',
        }}
        containerStyle={{
            borderRadius: 8,
        }}
    />
  ), []);

  const NumericInput = useCallback(({ placeholder, value, onChange }: any) => (
    <TextInput
        className="border border-[#537D5D] rounded-md px-3 py-2 w-full mb-3 text-black bg-orange-50"
        placeholder={placeholder}
        placeholderTextColor="#537D5D"
        keyboardType="numeric"
        value={value}
        onChangeText={onChange}
        blurOnSubmit={false}
        autoCorrect={false}
        autoCapitalize="none"
    />
  ), []);

  const totalCarbon = useMemo(() => 
    activityData.reduce((sum, act) => sum + act.carbon, 0).toFixed(2)
  , [activityData]);

  const yesterDayCarbon = 100;

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
    setIsEditing(false);
    setTypeActivity('');
    setActivityName('');
    setActivityDesc('');
    setParam1('');
    setParam2('');
  }, []);

  const handleActivityTypePress = useCallback((itemName: string) => {
    setTypeActivity(itemName);
    setModalVisible(true);
  }, []);

  return (
    <View className="flex-1 bg-orange-50">
      <Header title="Track Aktivitas" isOnDashboard={false} />

      <ScrollView className="flex-1 p-4">
        <Text className="font-poppins-medium text-[20px] text-black">Tambah Cepat</Text>

        <ScrollView horizontal className="mt-4">
          <View className="flex-row gap-3">
            {activityContent.map((item, idx) => (
              <ActivityType
                key={idx}
                activityType={item}
                onPress={() => handleActivityTypePress(item.name)}
              />
            ))}
          </View>
        </ScrollView>

        <View className="flex-row justify-between items-center mt-6 mb-2">
          <Text className="font-poppins-medium text-[18px] text-black">Aktivitas Hari ini</Text>
          <Text className="font-poppins text-sm text-[#323232]">Total: {totalCarbon} kg CO₂e</Text>
        </View>

        <View className="bg-white p-4 rounded-[10px]">
          {activityData.map((item, index) => (
            <React.Fragment key={index}>
              <Activity
                activity={item}
                handleEdit={() => {
                    setIsEditing(true);
                  setModalVisible(true);
                  setTypeActivity(item.type);
                  setActivityName(item.name);
                  setActivityDesc(item.description);
                  setParam1(item.param1);
                  setParam2(item.param2.toString());
                }}
                handleDelete={() => handleDeleteActivity(index)}
              />
              {index < activityData.length - 1 && (
                <View className="h-[1px] bg-[#D9D9D9] my-3" />
              )}
            </React.Fragment>
          ))}
        </View>

        <Text className="font-poppins-medium text-[18px] mt-10 text-black">Minggu Ini</Text>
        <View className="p-2 mb-10 items-center">
          <TotalEmision totalEmision={{
            value: totalCarbon,
            changesValue: Math.abs(parseFloat(totalCarbon) - yesterDayCarbon).toFixed(2),
            isIncrease: parseFloat(totalCarbon) > yesterDayCarbon,
          }} />
        </View>
      </ScrollView>

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="m-5 bg-white rounded-xl p-8 w-11/12">
            <Text className="text-lg font-semibold mb-4 text-black text-center">Track {typeActivity}</Text>

            <TextInput
              className="border border-[#537D5D] rounded-md px-3 py-2 w-full mb-3 text-black bg-orange-50"
              placeholder="Nama Aktivitas"
              placeholderTextColor="#537D5D"
              value={activityName}
              onChangeText={setActivityName}
              blurOnSubmit={false}
              autoCorrect={false}
              autoCapitalize="sentences"
            />
            <TextInput
              className="border border-[#537D5D] rounded-md px-3 py-2 w-full mb-3 text-black bg-orange-50"
              placeholder="Deskripsi"
              placeholderTextColor="#537D5D"
              value={activityDesc}
              onChangeText={setActivityDesc}
              multiline
              numberOfLines={3}
              blurOnSubmit={false}
              autoCorrect={false}
              autoCapitalize="sentences"
            />

            {typeActivity === 'Transportasi' && (
              <>
                <DropdownInput
                  label="Moda Transportasi"
                  value={param1}
                  onChange={setParam1}
                  data={transportationData}
                />
                <NumericInput placeholder="Jarak (km)" value={param2} onChange={setParam2} />
              </>
            )}
            {typeActivity === 'Makanan' && (
              <>
                <DropdownInput
                  label="Jenis Makanan"
                  value={param1}
                  onChange={setParam1}
                  data={categoryData}
                />
                <NumericInput placeholder="Jumlah Porsi" value={param2} onChange={setParam2} />
              </>
            )}
            {typeActivity === 'Energi' && (
              <>
                <DropdownInput
                  label="Jenis Energi"
                  value={param1}
                  onChange={setParam1}
                  data={categoryData}
                />
                <NumericInput placeholder="Konsumsi (kWh)" value={param2} onChange={setParam2} />
              </>
            )}
            {typeActivity === 'Belanja' && (
              <>
                <DropdownInput
                  label="Jenis Belanja"
                  value={param1}
                  onChange={setParam1}
                  data={categoryData}
                />
                <NumericInput placeholder="Jumlah Barang" value={param2} onChange={setParam2} />
              </>
            )}

            <Pressable
              className="rounded-lg px-4 py-2 mt-4 bg-[#537D5D] w-full"
              onPress={handleAddActivity}
            >
              <Text className="text-white text-center">
                {isEditing ? 'Update Track' : 'Tambah Track'}
              </Text>
            </Pressable>
            <Pressable
              className="rounded-lg px-4 py-2 mt-2 bg-red-500 w-full"
              onPress={handleModalClose}
            >
              <Text className="text-white text-center">Batal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}